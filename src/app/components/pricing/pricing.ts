// 📁 src/app/components/pricing/pricing.ts (UPDATED - Fetch from API)
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
        // Fallback to static data if API fails
        this.loadFallbackPlans();
      }
    });
  }

  loadFallbackPlans() {
    // Fallback static data if API fails
    this.plans = [
      {
        id: 1,
        name: 'Monthly',
        nameAr: 'شهري',
        price: 499,
        durationDays: 30,
        description: 'Perfect for small businesses',
        descriptionAr: 'مثالي للشركات الصغيرة',
        features: [
          { en: 'All features', ar: 'كل المميزات' },
          { en: 'Free updates', ar: 'تحديثات مجانية' },
          { en: '24/7 Support', ar: 'دعم 24/7' },
          { en: 'Daily backup', ar: 'نسخ احتياطي يومي' }
        ],
        isActive: true,
        displayOrder: 1
      },
      {
        id: 3,
        name: 'Semi-Annual',
        nameAr: 'نصف سنوي',
        price: 2499,
        durationDays: 180,
        description: 'Best value for growing businesses',
        descriptionAr: 'أفضل قيمة للشركات النامية',
        features: [
          { en: 'All features', ar: 'كل المميزات' },
          { en: 'Free updates', ar: 'تحديثات مجانية' },
          { en: '24/7 Support', ar: 'دعم 24/7' },
          { en: 'Daily backup', ar: 'نسخ احتياطي يومي' },
          { en: 'Free training', ar: 'تدريب مجاني' }
        ],
        isActive: true,
        displayOrder: 3
      },
      {
        id: 4,
        name: 'Annual',
        nameAr: 'سنوي',
        price: 4499,
        durationDays: 365,
        description: 'Maximum savings for established businesses',
        descriptionAr: 'أقصى توفير للشركات الراسخة',
        features: [
          { en: 'All features', ar: 'كل المميزات' },
          { en: 'Free updates', ar: 'تحديثات مجانية' },
          { en: '24/7 Support', ar: 'دعم 24/7' },
          { en: 'Daily backup', ar: 'نسخ احتياطي يومي' },
          { en: 'Free training', ar: 'تدريب مجاني' },
          { en: 'Priority support', ar: 'أولوية في الدعم' }
        ],
        isActive: true,
        displayOrder: 4
      }
    ];
  }

  getPeriodText(days: number): string {
    if (days === 30) return 'جنيه/شهر';
    if (days === 90) return 'جنيه/3 شهور';
    if (days === 180) return 'جنيه/6 شهور';
    if (days === 365) return 'جنيه/سنة';
    return `جنيه/${days} يوم`;
  }

  getSaveText(displayOrder: number): string {
    if (displayOrder === 3) return 'توفير 17%';
    if (displayOrder === 4) return 'توفير 25%';
    return '';
  }

  isPopular(displayOrder: number): boolean {
    return displayOrder === 4; // Annual plan is most popular
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}