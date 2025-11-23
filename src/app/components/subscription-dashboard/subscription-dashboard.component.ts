// 📁 src/app/components/subscription-dashboard/subscription-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  SubscriptionStatsService, 
  SubscriptionStats, 
  MonthlyRevenueReport 
} from '../../services/subscription-stats.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-subscription-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription-dashboard.component.html',
  styleUrls: ['./subscription-dashboard.component.scss']
})
export class SubscriptionDashboardComponent implements OnInit {
  stats: SubscriptionStats | null = null;
  yearlyReport: MonthlyRevenueReport | null = null;
  isLoading = true;
  
  // Filters
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  
  // Available years for dropdown
  availableYears: number[] = [];

  constructor(
    private statsService: SubscriptionStatsService,
    public authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is developer
    if (this.authService.currentUser?.role !== 'developer') {
      this.toastService.error('خطأ', 'هذه الصفحة مخصصة للمطورين فقط');
      this.router.navigate(['/']);
      return;
    }

    this.initializeYears();
    this.loadStats();
    this.loadYearlyReport();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    // Show last 3 years + current year
    for (let i = 0; i < 4; i++) {
      this.availableYears.push(currentYear - i);
    }
  }

  loadStats() {
    this.isLoading = true;
    
    this.statsService.getStats(this.selectedMonth, this.selectedYear).subscribe({
      next: (response) => {
        this.stats = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.toastService.error('خطأ', 'فشل تحميل الإحصائيات');
        this.isLoading = false;
      }
    });
  }

  loadYearlyReport() {
    this.statsService.getMonthlyRevenue(this.selectedYear).subscribe({
      next: (response) => {
        this.yearlyReport = response.data;
      },
      error: (error) => {
        console.error('Error loading yearly report:', error);
      }
    });
  }

  onMonthChange() {
    this.loadStats();
  }

  onYearChange() {
    this.loadStats();
    this.loadYearlyReport();
  }

  goToCompanies() {
    this.router.navigate(['/dashboard/companies']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('تم تسجيل الخروج', 'وداعاً، نراك قريباً');
        this.router.navigate(['/dev-login']);
      },
      error: () => {
        this.toastService.error('خطأ', 'فشل تسجيل الخروج');
      }
    });
  }

  // Helper methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  getMonthName(month: number): string {
    const date = new Date(2025, month - 1);
    return date.toLocaleString('ar-EG', { month: 'long' });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-danger';
      case 'cancelled': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  }
}