// 📁 src/app/components/companies/companies.component.ts
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
fixDate(dateString: string): string {
  const date = new Date(dateString);

  // تصحيح التاريخ حسب timezone
  const corrected = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return corrected.toISOString().split('T')[0];
}

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

    // Search filter
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
  if (!this.selectedCompany || !this.newExpiryDate) return;

  const currentExpiry = new Date(this.selectedCompany.subscriptionExpiryDate);
  const newExpiry = new Date(this.newExpiryDate);

  // 🔥 تحقق من أن التاريخ الجديد لا يقل عن القديم
  if (newExpiry < currentExpiry) {
    this.toastService.error(
      'تاريخ غير صالح',
      `لا يمكن تقليل مدة الاشتراك. تاريخ الانتهاء الحالي هو: 
      ${currentExpiry.toLocaleDateString('ar-EG')}`
    );
    return; // ❌ توقف قبل الإرسال
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

      // ✔ لو الباك إند رجع خطأ من نفس النوع
      if (error?.error?.message) {
        this.toastService.error('خطأ', error.error.message);
      } else {
        this.toastService.error('خطأ', 'فشل تحديث تاريخ الاشتراك');
      }

      this.isUpdating = false;
    }
  });
}


  logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      this.authService.logout().subscribe({
        next: () => {
          this.toastService.success('تم', 'تم تسجيل الخروج بنجاح');
        },
        error: () => {
          this.toastService.error('خطأ', 'فشل تسجيل الخروج');
        }
      });
    }
  }
}