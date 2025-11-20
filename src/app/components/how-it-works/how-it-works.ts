// 📁 src/app/components/how-it-works/how-it-works.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  icon: string;
  stepNumber: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.scss']
})
export class HowItWorks {
  steps: Step[] = [
    {
      icon: 'bi-check-circle-fill',
      stepNumber: '01',
      title: 'أضف بياناتك',
      desc: 'عملاء ومنتجات في دقايق'
    },
    {
      icon: 'bi-shield-check',
      stepNumber: '02',
      title: 'تابع كل شيء',
      desc: 'فواتير • أقساط • صيانة'
    },
    {
      icon: 'bi-rocket-takeoff-fill',
      stepNumber: '03',
      title: 'نمّي بيزنسك',
      desc: 'النظام يشتغل لوحده'
    }
  ];
}