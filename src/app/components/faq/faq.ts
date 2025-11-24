// 📁 src/app/components/faq/faq.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  highlights?: string[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class Faq {
  activeFaq: number | null = null;

  faqs: FaqItem[] = [
    {
      id: 1,
      question: 'هل في تجربة مجانية؟',
      answer: 'أيوة! 10 يوم كاملين مجاناً بدون بطاقة ائتمان.',
      highlights: [
        'لا يتطلب بطاقة ائتمانية',
        'وصول كامل لجميع المميزات',
        'إلغاء في أي وقت'
      ]
    },
    {
      id: 2,
      question: 'هل النظام شغال على الموبايل؟',
      answer: '100% - تصميم responsive وسريع زي البرق.',
      highlights: [
        'يعمل على جميع الأجهزة',
        'تطبيق محمول قريباً',
        'تجربة مستخدم سلسة'
      ]
    },
    {
      id: 3,
      question: 'في دعم فني؟',
      answer: 'دعم 24/7 عبر واتساب وتليفون وإيميل.',
      highlights: [
        'رد سريع خلال دقائق',
        'فريق متخصص',
        'دعم باللغة العربية'
      ]
    },
    {
      id: 4,
      question: 'هل البيانات آمنة؟',
      answer: 'نسخ احتياطي يومي + تشفير 256-bit + سيرفرات في أوروبا.',
      highlights: [
        'تشفير عالي المستوى',
        'نسخ احتياطي تلقائي',
        'امتثال لمعايير GDPR'
      ]
    },
    {
      id: 5,
      question: 'ممكن ألغي في أي وقت؟',
      answer: 'أكيد! إلغاء فوري بدون أسئلة.',
      highlights: [
        'بدون رسوم إلغاء',
        'استرداد كامل للمبلغ',
        'عملية سهلة وسريعة'
      ]
    }
  ];

  toggleFaq(faqId: number): void {
    this.activeFaq = this.activeFaq === faqId ? null : faqId;
  }

  contactSupport(): void {
    // Navigate to contact page or open contact modal
    console.log('Contact support clicked');
    // You can implement navigation or modal opening here
    // For example: this.router.navigate(['/contact']);
  }
}