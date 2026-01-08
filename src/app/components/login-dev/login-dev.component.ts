// 📁 src/app/components/login-dev/login-dev.component.ts - RETURN URL
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
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
    //  Check if already logged in
    if (this.authService.isAuthenticated) {
      if (this.authService.isDeveloper) {
        this.router.navigate(['/dashboard/companies']);
        return;
      } else {
        this.authService.logout().subscribe(() => {
          this.toastService.warning('تنبيه', 'هذه الصفحة مخصصة للمطورين فقط');
        });
      }
    }

    //  Get return URL from query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/companies';
  }

  validateForm(): boolean {
    this.resetErrors();
    let isValid = true;

    if (!this.formData.email.trim()) {
      this.errors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      this.errors.email = 'البريد الإلكتروني غير صحيح';
      isValid = false;
    }

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

    this.authService.loginDev(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success(
            'مرحباً!',
            `أهلاً بك ${response.data.user.fullName}`
          );

          //  Navigate to return URL or default dashboard
          setTimeout(() => {
            this.router.navigate([this.returnUrl]).then(() => {
              console.log(' Navigation successful to:', this.returnUrl);
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