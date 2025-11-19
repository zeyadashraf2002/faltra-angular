// ============================================
// 📁 src/app/components/testimonials/testimonials.ts
// ============================================
import { Component } from '@angular/core';

interface Testimonial {
  name: string;
  city: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
  standalone: false
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      name: 'أحمد السيد',
      city: 'القاهرة',
      text: 'ساعدنا النظام في تنظيم سير العمل ومتابعة الأداء بدقة، مما جعل فريقنا أكثر إنتاجية وكفاءة.'
    },
    {
      name: 'محمد علي',
      city: 'الإسكندرية',
      text: 'واجهة الاستخدام واضحة وسلسة، وتجربة التعامل مع النظام كانت ممتازة من أول يوم.'
    },
    {
      name: 'فاطمة حسن',
      city: 'الجيزة',
      text: 'خدمة الدعم الفني رائعة، والنتائج التي حصلنا عليها فاقت التوقعات. أنصح به بشدة.'
    }
  ];
}
