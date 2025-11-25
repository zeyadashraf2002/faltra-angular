// 📁 companies.component.ts - WITHOUT MODAL
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Company } from '../../models/company.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

type SubscriptionFilter = 'all' | 'active' | 'expired';

interface ExtendedCompany extends Company {
  effectiveExpiryDate?: string | null;
  status?: 'active' | 'expired';
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  companies: ExtendedCompany[] = [];
  filteredCompanies: ExtendedCompany[] = [];
  isLoading = false;
  searchQuery = '';
  subscriptionFilter: SubscriptionFilter = 'all';
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor(
    public authService: AuthService,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading = true;

    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data as ExtendedCompany[];

        // Fetch subscription status for each company
        const statusRequests = this.companies.map((company) =>
          this.subscriptionService.getCompanyStatus(company.id).pipe(
            map((response) => ({
              companyId: company.id,
              effectiveExpiryDate: response.data.expiryDate,
              status: response.data.status,
            }))
          )
        );

        forkJoin(statusRequests).subscribe({
          next: (statuses) => {
            this.companies = this.companies.map((company) => {
              const companyStatus = statuses.find((s) => s.companyId === company.id);
              return {
                ...company,
                effectiveExpiryDate: companyStatus?.effectiveExpiryDate || null,
                status: companyStatus?.status || 'expired',
              };
            });
            this.applyFilters();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading subscription statuses:', error);
            this.toastService.error('خطأ', 'فشل تحميل حالات الاشتراكات');
            this.isLoading = false;
            // Fallback to using subscriptionExpiryDate if status fetch fails
            this.companies = this.companies.map((company) => ({
              ...company,
              effectiveExpiryDate: company.subscriptionExpiryDate,
              status: this.calculateFallbackStatus(company.subscriptionExpiryDate),
            }));
            this.applyFilters();
          },
        });
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.toastService.error('خطأ', 'فشل تحميل الشركات');
        this.isLoading = false;
      },
    });
  }

  private calculateFallbackStatus(expiryDate: string | undefined): 'active' | 'expired' {
    if (!expiryDate) return 'expired';
    return new Date(expiryDate) > new Date() ? 'active' : 'expired';
  }

  applyFilters() {
    let filtered = this.companies;

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.email?.toLowerCase().includes(query) ||
          company.phone?.includes(query)
      );
    }

    if (this.subscriptionFilter === 'active') {
      filtered = filtered.filter((company) => company.status === 'active');
    } else if (this.subscriptionFilter === 'expired') {
      filtered = filtered.filter((company) => company.status === 'expired');
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

  get paginatedCompanies(): ExtendedCompany[] {
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

  viewCompanyDetails(companyId: number) {
    this.router.navigate(['/dashboard/companies', companyId]);
  }

  goToStats() {
    this.router.navigate(['/dashboard/subscriptions']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.success('تم تسجيل الخروج', 'وداعاً، نراك قريباً');
        this.router.navigate(['/dev-login']);
      },
      error: () => {
        this.toastService.error('خطأ', 'فشل تسجيل الخروج');
      },
    });
  }
}
