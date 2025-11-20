// 📁 src/app/components/companies/companies.component.ts - COMPLETE FIX
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Company } from '../../models/company.model';

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
    private toastService: ToastService
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

    this.filteredCompanies = filtered;
    this.totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
    this.currentPage = 1;
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

  /**
   * ✅ FIX: تصحيح التاريخ حسب timezone
   */
  fixDate(dateString: string): string {
    const date = new Date(dateString);
    const corrected = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return corrected.toISOString().split('T')[0];
  }

  /**
   * ✅ NEW: الحصول على تاريخ اليوم لـ min attribute
   */
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  /**
   * ✅ NEW: معالج الضغط على date input
   */
  onDateInputClick(event: Event) {
    const input = event.target as HTMLInputElement;
    try {
      input.showPicker(); // ✅ فتح calendar picker
    } catch (error) {
      // Fallback للمتصفحات القديمة
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

  /**
   * ✅ FIX: تحديث الاشتراك
   */
  updateExpiry() {
    if (!this.selectedCompany || !this.newExpiryDate) {
      this.toastService.error('خطأ', 'يرجى اختيار تاريخ صحيح');
      return;
    }

    const currentExpiry = new Date(this.selectedCompany.subscriptionExpiryDate);
    const newExpiry = new Date(this.newExpiryDate);
    
    // ✅ إضافة يوم للتعويض عن timezone
    newExpiry.setDate(newExpiry.getDate() + 1);

    // التحقق من عدم تقليل المدة
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

  /**
   * ✅ FIX: تسجيل الخروج بدون تأكيد
   * أو إظهار toast للتأكيد
   */
  logout() {
    // ✅ خروج مباشر بدون confirm
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('تم تسجيل الخروج', 'وداعاً، نراك قريباً');
      },
      error: () => {
        this.toastService.error('خطأ', 'فشل تسجيل الخروج');
      }
    });
  }
  
  /**
   * OR - إذا أردت Toast للتأكيد بدلاً من confirm:
   */
  /*
  logout() {
    // عرض Toast للتأكيد
    this.toastService.warning(
      'تأكيد تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟'
    );
    
    // يمكنك إضافة timeout للخروج التلقائي
    setTimeout(() => {
      this.authService.logout().subscribe({
        next: () => {
          this.toastService.success('تم', 'تم تسجيل الخروج بنجاح');
        }
      });
    }, 2000);
  }
  */
}