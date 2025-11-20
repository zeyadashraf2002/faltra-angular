// 📁 src/app/components/companies/companies.component.ts (Updated with Filters)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ NEW
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Company } from '../../models/company.model';

type SubscriptionFilter = 'all' | 'active' | 'expired';

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
  
  // 🔹 NEW: Filter by subscription status
  subscriptionFilter: SubscriptionFilter = 'all';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;
  
  // Modal
  showExpiryModal = false;
  selectedCompany: Company | null = null;
  newExpiryDate = '';
  isUpdating = false;

  constructor(
    public authService: AuthService,
    private companyService: CompanyService,
    private toastService: ToastService,
    private router: Router // ✅ NEW
  ) {}

  ngOnInit() {
    this.loadCompanies();
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

  // 🔹 NEW: Apply both search and subscription filters
  applyFilters() {
    let filtered = this.companies;

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(query) ||
        company.email?.toLowerCase().includes(query) ||
        company.phone?.includes(query)
      );
    }

    // 🔹 NEW: Filter by subscription status
    if (this.subscriptionFilter === 'active') {
      filtered = filtered.filter(company => !this.isExpired(company.subscriptionExpiryDate));
    } else if (this.subscriptionFilter === 'expired') {
      filtered = filtered.filter(company => this.isExpired(company.subscriptionExpiryDate));
    }
    // 'all' shows everything

    this.filteredCompanies = filtered;
    this.totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  // 🔹 NEW: Change subscription filter
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

  fixDate(dateString: string): string {
    const date = new Date(dateString);
    const corrected = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return corrected.toISOString().split('T')[0];
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onDateInputClick(event: Event) {
    const input = event.target as HTMLInputElement;
    try {
      input.showPicker();
    } catch (error) {
      input.focus();
      console.log('showPicker not supported, using focus fallback');
    }
  }

  openExpiryModal(company: Company) {
    this.selectedCompany = company;
    this.newExpiryDate = this.fixDate(company.subscriptionExpiryDate);
    this.showExpiryModal = true;
  }

  closeExpiryModal() {
    this.showExpiryModal = false;
    this.selectedCompany = null;
    this.newExpiryDate = '';
  }

  updateExpiry() {
    if (!this.selectedCompany || !this.newExpiryDate) {
      this.toastService.error('خطأ', 'يرجى اختيار تاريخ صحيح');
      return;
    }

    const currentExpiry = new Date(this.selectedCompany.subscriptionExpiryDate);
    const newExpiry = new Date(this.newExpiryDate);
    
    newExpiry.setDate(newExpiry.getDate() + 1);

    if (newExpiry < currentExpiry) {
      this.toastService.error(
        'تاريخ غير صالح',
        `لا يمكن تقليل مدة الاشتراك. التاريخ الحالي: ${currentExpiry.toLocaleDateString('ar-EG')}`
      );
      return;
    }

    this.isUpdating = true;

    this.companyService.updateSubscription(this.selectedCompany.id, {
      subscriptionExpiryDate: newExpiry.toISOString()
    }).subscribe({
      next: () => {
        this.toastService.success('نجاح', 'تم تحديث تاريخ الاشتراك بنجاح');
        this.loadCompanies();
        this.closeExpiryModal();
        this.isUpdating = false;
      },
      error: (error) => {
        console.error('Error updating expiry:', error);
        const errorMsg = error?.error?.message || 'فشل تحديث تاريخ الاشتراك';
        this.toastService.error('خطأ', errorMsg);
        this.isUpdating = false;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('تم تسجيل الخروج', 'وداعاً، نراك قريباً');
        // ✅ التوجيه بعد تسجيل الخروج
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastService.error('خطأ', 'فشل تسجيل الخروج');
      }
    });
  }
}