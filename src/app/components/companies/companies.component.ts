// 📁 companies.component.ts - COMPLETE WITH CASH SUBSCRIPTION
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Company } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type SubscriptionFilter = 'all' | 'active' | 'expired';

interface Plan {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  durationDays: number;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  isLoading = false;
  searchQuery = '';
  subscriptionFilter: SubscriptionFilter = 'all';
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  // ✨ NEW: Cash Subscription Modal
  showAddSubscriptionModal = false;
  selectedCompany: Company | null = null;
  availablePlans: Plan[] = [];
  isLoadingPlans = false;
  isSubmittingCash = false;
  
  cashSubscriptionForm = {
    planId: null as number | null,
    notes: ''
  };

  constructor(
    public authService: AuthService,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService,
    private toastService: ToastService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCompanies();
    this.loadPlans();
  }

  loadCompanies() {
    this.isLoading = true;
    
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.toastService.error('خطأ', 'فشل تحميل الشركات');
        this.isLoading = false;
      }
    });
  }

  // ✨ NEW: Load Plans for Cash Subscription
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

  applyFilters() {
    let filtered = this.companies;

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(query) ||
        company.email?.toLowerCase().includes(query) ||
        company.phone?.includes(query)
      );
    }

    if (this.subscriptionFilter === 'active') {
      filtered = filtered.filter(company => !this.isExpired(company.subscriptionExpiryDate));
    } else if (this.subscriptionFilter === 'expired') {
      filtered = filtered.filter(company => this.isExpired(company.subscriptionExpiryDate));
    }

    this.filteredCompanies = filtered;
    this.totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  setSubscriptionFilter(filter: SubscriptionFilter) {
    this.subscriptionFilter = filter;
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  get paginatedCompanies(): Company[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCompanies.slice(start, end);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  isExpired(expiryDate: string): boolean {
    return new Date(expiryDate) < new Date();
  }

  viewCompanyDetails(companyId: number) {
    this.router.navigate(['/dashboard/companies', companyId]);
  }

  // ✨ NEW: Navigate to Stats Dashboard
  goToStats() {
    this.router.navigate(['/dashboard/subscriptions']);
  }

  // ✨ NEW: Open Cash Subscription Modal
  openAddSubscriptionModal(company: Company) {
    this.selectedCompany = company;
    this.showAddSubscriptionModal = true;
    this.resetCashForm();
  }

  closeAddSubscriptionModal() {
    this.showAddSubscriptionModal = false;
    this.selectedCompany = null;
    this.resetCashForm();
  }

  resetCashForm() {
    this.cashSubscriptionForm = {
      planId: null,
      notes: ''
    };
  }

  // ✨ NEW: Submit Cash Subscription
  submitCashSubscription() {
    if (!this.selectedCompany || !this.cashSubscriptionForm.planId) {
      this.toastService.error('خطأ', 'يرجى اختيار باقة');
      return;
    }

    this.isSubmittingCash = true;

    const payload = {
      companyId: this.selectedCompany.id,
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
          `تم إضافة اشتراك كاش لشركة ${this.selectedCompany?.name}`
        );
        this.closeAddSubscriptionModal();
        this.loadCompanies(); // Refresh companies list
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
}