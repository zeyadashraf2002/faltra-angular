import { Component } from '@angular/core';

@Component({
  selector: 'app-screenshots',
  standalone: false,
  templateUrl: './screenshots.html',
  styleUrls: ['./screenshots.scss']
})
export class Screenshots{
  images = [
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'لوحة التحكم الرئيسية' },
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'إدارة العملاء' },
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'إصدار الفواتير' },
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'جدولة الصيانة' },
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'إدارة المخزون' },
    { src: 'https://assets.justinmind.com/wp-content/uploads/2024/06/dashboard-examples-vertical.png', title: 'التقارير الذكية' }
  ];
}