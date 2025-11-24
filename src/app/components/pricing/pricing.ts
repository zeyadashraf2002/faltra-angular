// 📁 src/app/components/pricing/pricing.ts - ENHANCED
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SubscriptionService } from '../../services/subscription.service';

interface Plan {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  durationDays: number;
  description: string;
  descriptionAr: string;
  features: Array<{ en: string; ar: string }>;
  isActive: boolean;
  displayOrder: number;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.scss'],
})
export class Pricing implements OnInit {
  plans: Plan[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.isLoading = true;
    this.error = null;

    this.subscriptionService.getPlans().subscribe({
      next: (response) => {
        console.log('✅ Plans loaded:', response);
        this.plans = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading plans:', error);
        this.error = 'فشل تحميل خطط الاشتراك';
        this.isLoading = false;
        this.loadFallbackPlans();
      }
    });
  }

  loadFallbackPlans() {
    this.plans = [
      {
        id: 1,
        name: 'Monthly',
        nameAr: 'الباقة الشهرية',
        price: 499,
        durationDays: 30,
        description: 'Perfect for small businesses',
        descriptionAr: 'مثالي للشركات الصغيرة والبداية',
        features: [
          { en: 'All core features', ar: 'جميع المميزات الأساسية' },
          { en: 'Unlimited clients', ar: 'عملاء غير محدودين' },
          { en: 'Invoice management', ar: 'إدارة الفواتير' },
          { en: 'Basic reports', ar: 'تقارير أساسية' },
          { en: 'Email support', ar: 'دعم عبر البريد' }
        ],
        isActive: true,
        displayOrder: 1
      },
      {
        id: 3,
        name: 'Semi-Annual',
        nameAr: 'الباقة نصف السنوية',
        price: 2499,
        durationDays: 180,
        description: 'Best value for growing businesses',
        descriptionAr: 'أفضل قيمة للشركات النامية',
        features: [
          { en: 'All Monthly features', ar: 'كل مميزات الباقة الشهرية' },
          { en: 'Advanced analytics', ar: 'تحليلات متقدمة' },
          { en: 'AI assistant', ar: 'مساعد AI ذكي' },
          { en: 'Priority support', ar: 'دعم ذو أولوية' },
          { en: 'Custom reports', ar: 'تقارير مخصصة' },
          { en: 'Free training', ar: 'تدريب مجاني' }
        ],
        isActive: true,
        displayOrder: 3
      },
      {
        id: 4,
        name: 'Annual',
        nameAr: 'الباقة السنوية',
        price: 4499,
        durationDays: 365,
        description: 'Maximum savings for established businesses',
        descriptionAr: 'أقصى توفير للشركات الراسخة',
        features: [
          { en: 'All Semi-Annual features', ar: 'كل مميزات نصف السنوية' },
          { en: 'Dedicated account manager', ar: 'مدير حساب مخصص' },
          { en: 'API access', ar: 'وصول كامل للـ API' },
          { en: '24/7 phone support', ar: 'دعم هاتفي 24/7' },
          { en: 'Custom integrations', ar: 'تكاملات مخصصة' },
          { en: 'White-label options', ar: 'خيارات white-label' },
          { en: 'Onsite training', ar: 'تدريب في الموقع' }
        ],
        isActive: true,
        displayOrder: 4
      }
    ];
  }

  getPeriodText(days: number): string {
    if (days === 30) return 'شهر';
    if (days === 90) return '3 شهور';
    if (days === 180) return '6 شهور';
    if (days === 365) return 'سنة';
    return `${days} يوم`;
  }

  getSaveText(displayOrder: number): string {
    if (displayOrder === 3) return 'وفر 17%';
    if (displayOrder === 4) return 'وفر 25%';
    return '';
  }

  isPopular(displayOrder: number): boolean {
    return displayOrder === 4;
  }

  getPlanIcon(displayOrder: number): string {
    if (displayOrder === 1) return 'bi-box';
    if (displayOrder === 3) return 'bi-rocket-takeoff';
    if (displayOrder === 4) return 'bi-trophy';
    return 'bi-star';
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}