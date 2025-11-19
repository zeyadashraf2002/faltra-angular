import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone:false,
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class Faq {
  faqs = [
    { q: 'هل في تجربة مجانية؟', a: 'أيوة! 14 يوم كاملين مجاناً بدون بطاقة ائتمان.' },
    { q: 'هل النظام شغال على الموبايل؟', a: '100% - تصميم responsive وسريع زي البرق.' },
    { q: 'في دعم فني؟', a: 'دعم 24/7 عبر واتساب وتليفون وإيميل.' },
    { q: 'هل البيانات آمنة؟', a: 'نسخ احتياطي يومي + تشفير 256-bit + سيرفرات في أوروبا.' },
    { q: 'ممكن ألغي في أي وقت؟', a: 'أكيد! إلغاء فوري بدون أسئلة.' }
  ];
}