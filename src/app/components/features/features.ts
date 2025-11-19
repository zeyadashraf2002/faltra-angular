// src/app/components/features/features.component.ts
import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
}

@Component({
  selector: 'app-features',
  standalone: false,
  templateUrl: './features.html',
  styleUrls: ['./features.scss']
})
export class Features {
  features: Feature[] = [
    {
      icon: 'bi-box-seam',
      title: 'إدارة المخزون',
      desc: 'تنبيهات نقص + موردين + باركود',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'bi-people',
      title: 'عملاء بدون حدود',
      desc: 'بيانات كاملة + صور + خرائط',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: 'bi-credit-card',
      title: 'فواتير احترافية',
      desc: 'نقدي أو تقسيط + PDF + طباعة',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'bi-wrench',
      title: 'صيانة ذكية',
      desc: 'واتساب + جدولة + تقارير',
      gradient: 'from-orange-500 to-red-500'
    }
  ];
}