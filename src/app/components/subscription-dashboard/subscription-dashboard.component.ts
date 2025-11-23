// 📁 subscription-dashboard.component.ts - FINAL VERSION
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { 
  SubscriptionStatsService, 
  SubscriptionStats, 
  MonthlyRevenueReport,
  Subscription 
} from '../../services/subscription-stats.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-subscription-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './subscription-dashboard.component.html',
  styleUrls: ['./subscription-dashboard.component.scss']
})
export class SubscriptionDashboardComponent implements OnInit {
  stats: SubscriptionStats | null = null;
  yearlyReport: MonthlyRevenueReport | null = null;
  isLoading = true;
  isExpiringOpen = true;
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  selectedPlanFilter:'all' | 'monthly' | 'quarterly' | 'yearly' | 'trial' = 'all';
  
  availableYears: number[] = [];

  // Collapsible states
  isChartOpen = true;
  isTrialOpen = true;
  isActiveOpen = true;

  // Chart config
  view: [number, number] = [800, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'الشهر';
  showYAxisLabel = true;
  yAxisLabel = 'الدخل (جنيه)';
  colorScheme: any = { domain: ['#2563EB', '#10B981', '#F59E0B'] };
  chartData: any[] = [];

  constructor(
    private statsService: SubscriptionStatsService,
    public authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
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
    for (let i = 0; i < 4; i++) {
      this.availableYears.push(currentYear - i);
    }
  }

  loadStats() {
    this.isLoading = true;
    this.statsService.getStats(this.selectedMonth, this.selectedYear).subscribe({
      next: (res) => {
        this.stats = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.error('خطأ', 'فشل تحميل الإحصائيات');
        this.isLoading = false;
      }
    });
  }
toggleExpiring() {
  this.isExpiringOpen = !this.isExpiringOpen;
}
  loadYearlyReport() {
    this.statsService.getMonthlyRevenue(this.selectedYear).subscribe({
      next: (res) => {
        this.yearlyReport = res.data;
        this.prepareChartData();
      },
      error: () => {}
    });
  }

  prepareChartData() {
    if (!this.yearlyReport) return;
    this.chartData = [{
      name: 'الدخل الشهري',
      series: this.yearlyReport.months.map(m => ({
        name: m.monthName,
        value: m.revenue || 0
      }))
    }];
  }

  onMonthChange() { this.loadStats(); }
  onYearChange() { this.loadStats(); this.loadYearlyReport(); }

  get filteredRecentSubscriptions(): Subscription[] {
  if (!this.stats) return [];

  // لو اختار "تجريبي" → ارجع الشركات التجريبية
  if (this.selectedPlanFilter === 'trial') {
    return this.stats.trialSubscriptions || [];
  }

  // لو اختار باقة مدفوعة أو الكل
  if (!this.stats.recentByPlan) return [];

  switch (this.selectedPlanFilter) {
    case 'monthly':   return this.stats.recentByPlan.monthly;
    case 'quarterly': return this.stats.recentByPlan.quarterly;
    case 'yearly':    return this.stats.recentByPlan.yearly;
    default:          return this.stats.recentByPlan.all;
  }
}

  // Toggle methods
  toggleChart() { this.isChartOpen = !this.isChartOpen; }
  toggleTrial() { this.isTrialOpen = !this.isTrialOpen; }
  toggleActive() { this.isActiveOpen = !this.isActiveOpen; }

  goToCompanies() { this.router.navigate(['/dashboard/companies']); }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('تم تسجيل الخروج', 'وداعاً!');
        this.router.navigate(['/dev-login']);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(amount);
  }

  getDaysRemainingClass(days: number): string {
    if (days <= 3) return 'badge-danger';
    if (days <= 7) return 'badge-warning';
    return 'badge-success';
  }
}