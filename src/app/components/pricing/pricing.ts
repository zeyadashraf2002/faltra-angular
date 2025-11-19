import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.scss'],
})
export class Pricing {
  plans = [
    {
      name: 'شهري',
      price: '499',
      period: 'جنيه/شهر',
      save: '',
      features: ['كل المميزات', 'تحديثات مجانية', 'دعم 24/7', 'نسخ احتياطي يومي'],
      popular: false,
    },
    {
      name: 'نص سنوي',
      price: '2,499',
      period: 'جنيه/6 شهور',
      save: 'توفير 17%',
      features: ['كل المميزات', 'تحديثات مجانية', 'دعم 24/7', 'نسخ احتياطي يومي', 'تدريب مجاني'],
      popular: true,
    },
    {
      name: 'سنوي',
      price: '4,499',
      period: 'جنيه/سنة',
      save: 'توفير 25%',
      features: [
        'كل المميزات',
        'تحديثات مجانية',
        'دعم 24/7',
        'نسخ احتياطي يومي',
        'تدريب مجاني',
        'أولوية في الدعم',
      ],
      popular: false,
    },
  ];

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}
