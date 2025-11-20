// 📁 src/app/components/contact/contact.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  formData = { name: '', phone: '', message: '' };
  errors = { name: '', phone: '', message: '' };
  toastVisible = false;
  toastMessage = '';

  onSubmit(): void {
    this.resetErrors();
    let hasError = false;

    if (!this.formData.name.trim()) {
      this.errors.name = 'الاسم مطلوب';
      hasError = true;
    }

    if (!this.formData.phone.trim()) {
      this.errors.phone = 'رقم الهاتف مطلوب';
      hasError = true;
    } else if (!/^01[0125][0-9]{8}$/.test(this.formData.phone.replace(/\s/g, ''))) {
      this.errors.phone = 'رقم الهاتف غير صحيح (مثال: 01234567890)';
      hasError = true;
    }

    if (!this.formData.message.trim()) {
      this.errors.message = 'الرسالة مطلوبة';
      hasError = true;
    } else if (this.formData.message.length < 10) {
      this.errors.message = 'الرسالة قصيرة جدًا (10 أحرف على الأقل)';
      hasError = true;
    }

    if (hasError) return;

    const templateParams = {
      name: this.formData.name,
      phone: this.formData.phone,
      message: this.formData.message,
      to_email: 'khedmaanas24247893@gmail.com',
    };

    emailjs
      .send(
        environment.emailServiceId,
        environment.emailTemplateId,
        templateParams,
        environment.emailPublicKey
      )
      .then(() => {
        this.showToast('✅ تم إرسال رسالتك بنجاح! سنرد عليك قريبًا 💬');
        this.formData = { name: '', phone: '', message: '' };
      })
      .catch(() => {
        this.showToast('❌ حدث خطأ أثناء الإرسال. حاول لاحقًا.');
      });
  }

  private resetErrors(): void {
    this.errors = { name: '', phone: '', message: '' };
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 3000);
  }
}