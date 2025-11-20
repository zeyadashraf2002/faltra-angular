// 📁 src/app/components/login-dev/login-dev.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-dev',
  templateUrl: './login-dev.component.html',
  imports: [FormsModule],
})
export class LoginDevComponent implements OnInit {
  formData = {
    email: '',
    password: ''
  };

  errors = {
    email: '',
    password: ''
  };

  isLoading = false;
  showPassword = false;
  returnUrl = '/dashboard/companies';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // إذا كان المستخدم مسجل دخول بالفعل
    if (this.authService.isAuthenticated) {
      // تحقق من أنه developer
      if (this.authService.isDeveloper) {
        // ✅ التوجيه المباشر لصفحة الشركات
        this.router.navigate(['/dashboard/companies']);
        return;
      } else {
        // إذا لم يكن developer، قم بتسجيل الخروج
        this.authService.logout().subscribe(() => {
          this.toastService.warning('تنبيه', 'هذه الصفحة مخصصة للمطورين فقط');
        });
      }
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/companies';
  }

  validateForm(): boolean {
    this.resetErrors();
    let isValid = true;

    // Validate email
    if (!this.formData.email.trim()) {
      this.errors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      this.errors.email = 'البريد الإلكتروني غير صحيح';
      isValid = false;
    }

    // Validate password
    if (!this.formData.password) {
      this.errors.password = 'كلمة المرور مطلوبة';
      isValid = false;
    } else if (this.formData.password.length < 8) {
      this.errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
      isValid = false;
    }

    return isValid;
  }

  resetErrors() {
    this.errors = { email: '', password: '' };
  }

  onSubmit() {
    if (!this.validateForm()) return;

    this.isLoading = true;

    // استخدام endpoint الخاص بالـ Developer
    this.authService.loginDev(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success(
            'مرحباً!',
            `أهلاً بك ${response.data.user.fullName}`
          );

          // ✅ استخدام setTimeout للتأكد من تنفيذ التوجيه بعد حفظ البيانات
          setTimeout(() => {
            this.router.navigate(['/dashboard/companies']).then(() => {
              console.log('✅ Navigation to /dashboard/companies successful');
            });
          }, 100);
        }
      },
      error: (error) => {
        this.isLoading = false;
        let errorMsg = 'خطأ في تسجيل الدخول';
        
        if (error.error.statusCode === 401) {
          errorMsg = "البريد الإلكتروني أو كلمة المرور غير صحيحة، أو أنك لست مطورًا";
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        this.toastService.error('خطأ', errorMsg);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}