// 📁 company-details.component.ts - WITH CASH SUBSCRIPTION
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CompanyService } from '../../services/company.service';
import { SubscriptionService } from '../../services/subscription.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

import { SubscriptionStatus } from '../../models/subscription-status.model';

interface Plan {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  durationDays: number;
}

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyId!: number;
  subscriptionStatus: SubscriptionStatus | null = null;
  isLoading = true;
  error: string | null = null;

  // ✨ Cash Subscription
  availablePlans: Plan[] = [];
  isLoadingPlans = false;
  isSubmittingCash = false;
  
  cashSubscriptionForm = {
    planId: null as number | null,
    notes: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService,
    private toastService: ToastService,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyId = Number(params['id']);
      if (this.companyId) {
        this.loadSubscriptionStatus();
        this.loadPlans();
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
        this.subscriptionStatus = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        const errorMsg = error.error?.message || 'فشل تحميل بيانات الاشتراك';
        this.error = errorMsg;
        this.toastService.error('خطأ', errorMsg);
        this.isLoading = false;
      }
    });
  }

  // ✨ Load Plans
  loadPlans() {
    this.isLoadingPlans = true;
    
    this.subscriptionService.getPlans().subscribe({
      next: (response) => {
        this.availablePlans = response.data || [];
        this.isLoadingPlans = false;
      },
      error: (error) => {
        console.error('Error loading plans:', error);
        this.isLoadingPlans = false;
      }
    });
  }

  // ✨ Submit Cash Subscription
  submitCashSubscription() {
    if (!this.subscriptionStatus?.company || !this.cashSubscriptionForm.planId) {
      this.toastService.error('خطأ', 'يرجى اختيار باقة');
      return;
    }

    this.isSubmittingCash = true;

    const payload = {
      companyId: this.subscriptionStatus.company.id,
      planId: this.cashSubscriptionForm.planId,
      notes: this.cashSubscriptionForm.notes.trim() || undefined
    };

    this.http.post(
      `${environment.API_URL}/subscriptions/cash-payment`,
      payload,
      { withCredentials: true }
    ).subscribe({
      next: (response: any) => {
        this.toastService.success(
          'تم بنجاح ✅',
          `تم إضافة اشتراك كاش لشركة ${this.subscriptionStatus?.company.name}`
        );
        this.resetCashForm();
        this.loadSubscriptionStatus(); // Refresh data
        this.isSubmittingCash = false;
      },
      error: (error) => {
        console.error('Error adding cash subscription:', error);
        const errorMsg = error.error?.message || 'فشل إضافة الاشتراك';
        this.toastService.error('خطأ', errorMsg);
        this.isSubmittingCash = false;
      }
    });
  }

  resetCashForm() {
    this.cashSubscriptionForm = {
      planId: null,
      notes: ''
    };
  }

  goBack() {
    this.router.navigate(['/dashboard/companies']);
  }

  isExpired(expiryDate: string): boolean {
    return new Date(expiryDate) < new Date();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-danger';
      case 'pending': return 'badge-warning';
      default: return 'badge-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'pending': return 'قيد الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  }

  getPaymentStatusBadge(status: string): { class: string; text: string; icon: string } {
    switch (status) {
      case 'paid': return { class: 'badge-success', text: 'مدفوع', icon: 'bi-check-circle' };
      case 'pending': return { class: 'badge-warning', text: 'قيد الانتظار', icon: 'bi-clock' };
      case 'failed': return { class: 'badge-danger', text: 'فشل', icon: 'bi-x-circle' };
      case 'refunded': return { class: 'badge-secondary', text: 'مسترد', icon: 'bi-arrow-clockwise' };
      default: return { class: 'badge-secondary', text: status, icon: 'bi-question-circle' };
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

  getSubscriptionStatusBadge(status: string): string {
    switch (status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-danger';
      case 'cancelled': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  }

  getSubscriptionStatusText(status: string): string {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  }
}