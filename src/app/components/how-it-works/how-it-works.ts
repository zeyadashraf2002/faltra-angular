// 📁 src/app/components/how-it-works/how-it-works.ts - FIXED
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Step {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  action?: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.scss']
})
export class HowItWorks {
  
  constructor(private router: Router) {}

  steps: Step[] = [
    {
      id: 1,
      number: '01',
      icon: 'bi-person-plus',
      title: 'أنشئ حسابك مجاناً',
      description: 'سجل بياناتك الأساسية واحصل على حساب مجاني لمدة 14 يوم',
      features: [
        'تسجيل سريع في أقل من دقيقة',
        'لا حاجة لبطاقة ائتمان',
        'وصول فوري لجميع المميزات'
      ],
      action: 'signup',
      actionLabel: 'ابدأ التسجيل الآن'
    },
    {
      id: 2,
      number: '02',
      icon: 'bi-gear',
      title: 'أضف بياناتك وخصص النظام',
      description: 'أضف بيانات شركتك، العملاء، المنتجات، والموظفين بسهولة',
      features: [
        'استيراد البيانات من Excel',
        'إضافة الشعار والألوان',
        'تخصيص الفواتير والتقارير'
      ]
    },
    {
      id: 3,
      number: '03',
      icon: 'bi-rocket-takeoff',
      title: 'ابدأ إدارة شركتك بكفاءة',
      description: 'استخدم جميع أدوات النظام لإدارة شركتك بسهولة واحترافية',
      features: [
        'إصدار الفواتير في ثوانٍ',
        'جدولة الصيانة تلقائياً',
        'تتبع المخزون والمبيعات',
        'تقارير تفصيلية لحظية'
      ],
       action: 'signup',
      actionLabel: 'ابدأ تجربتك المجانية'
    }
  ];

  handleAction(action: string): void {
    if (action === 'signup') {
      this.startTrial();
    } else if (action === 'demo') {
      this.scheduleDemo();
    }
  }

  startTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }

  scheduleDemo(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  playTutorial(): void {
    console.log('Play tutorial video');
  }
}