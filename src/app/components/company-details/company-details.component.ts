// 📁 src/app/components/company-details/company-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { SubscriptionService } from '../../services/subscription.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

interface SubscriptionStatus {
  company: {
    id: number;
    name: string;
    email: string;
  };
  status: 'active' | 'expired';
  currentSubscription: {
    id: number;
    status: string;
    startDate: string;
    endDate: string;
    plan: {
      id: number;
      name: string;
      nameAr: string;
      price: number;
      durationDays: number;
    };
  } | null;
  daysRemaining: number;
  expiryDate: string;
  invoices: Array<{
    id: number;
    planName: string;
    amount: number;
    durationDays: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    paidAt: string | null;
  }>;
  unreadAlerts: any[];
  alertsHistory: any[];
}

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyId!: number;
  subscriptionStatus: SubscriptionStatus | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Get company ID from route params
    this.route.params.subscribe(params => {
      this.companyId = Number(params['id']);
      if (this.companyId) {
        this.loadSubscriptionStatus();
      } else {
        this.error = 'معرف الشركة غير صحيح';
        this.isLoading = false;
      }
    });
  }

  loadSubscriptionStatus() {
    this.isLoading = true;
    this.error = null;

    this.subscriptionService.getCompanyStatus(this.companyId).subscribe({
      next: (response) => {
        console.log('✅ Subscription status:', response);
        this.subscriptionStatus = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading subscription:', error);
        const errorMsg = error.error?.message || 'فشل تحميل بيانات الاشتراك';
        this.error = errorMsg;
        this.toastService.error('خطأ', errorMsg);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/companies']);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'expired':
        return 'badge-danger';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي';
      case 'pending':
        return 'قيد الانتظار';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  }

  getPaymentStatusBadge(status: string): { class: string; text: string; icon: string } {
    switch (status) {
      case 'paid':
        return { class: 'badge-success', text: 'مدفوع', icon: 'bi-check-circle' };
      case 'pending':
        return { class: 'badge-warning', text: 'قيد الانتظار', icon: 'bi-clock' };
      case 'failed':
        return { class: 'badge-danger', text: 'فشل', icon: 'bi-x-circle' };
      case 'refunded':
        return { class: 'badge-secondary', text: 'مسترد ', icon: 'bi-arrow-clockwise' };
      default:
        return { class: 'badge-secondary', text: status, icon: 'bi-question-circle' };
    }
  }

  getPaymentMethodIcon(method: string): string {
    return method === 'stripe' ? 'bi-credit-card' : 'bi-cash-coin';
  }

  getPaymentMethodText(method: string): string {
    return method === 'stripe' ? 'بطاقة' : 'نقدي';
  }

  getDaysRemainingClass(): string {
    if (!this.subscriptionStatus) return '';
    
    const days = this.subscriptionStatus.daysRemaining;
    if (days <= 0) return 'text-danger';
    if (days <= 3) return 'text-danger';
    if (days <= 7) return 'text-warning';
    return 'text-success';
  }
}