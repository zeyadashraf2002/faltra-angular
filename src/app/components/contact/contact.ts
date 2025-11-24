// 📁 src/app/components/contact/contact.ts - إضافة isSubmitting
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

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
  isSubmitting = false; // ✅ أضفنا هذا

  constructor(private toastService: ToastService) {}

  onSubmit(): void {
    this.resetErrors();
    
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

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
        this.toastService.show({
          title: 'نجح الإرسال',
          description: 'تم إرسال رسالتك بنجاح! سنرد عليك قريباً 💬',
          variant: 'success'
        });
        this.formData = { name: '', phone: '', message: '' };
      })
      .catch(() => {
        this.toastService.show({
          title: 'خطأ في الإرسال',
          description: 'حدث خطأ أثناء الإرسال. حاول لاحقاً.',
          variant: 'destructive'
        });
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.formData.name.trim()) {
      this.errors.name = 'الاسم مطلوب';
      isValid = false;
    }

    if (!this.formData.phone.trim()) {
      this.errors.phone = 'رقم الهاتف مطلوب';
      isValid = false;
    } else if (!/^01[0125][0-9]{8}$/.test(this.formData.phone.replace(/\s/g, ''))) {
      this.errors.phone = 'رقم الهاتف غير صحيح (مثال: 01234567890)';
      isValid = false;
    }

    if (!this.formData.message.trim()) {
      this.errors.message = 'الرسالة مطلوبة';
      isValid = false;
    } else if (this.formData.message.length < 10) {
      this.errors.message = 'الرسالة قصيرة جداً (10 أحرف على الأقل)';
      isValid = false;
    }

    return isValid;
  }

  private resetErrors(): void {
    this.errors = { name: '', phone: '', message: '' };
  }
}