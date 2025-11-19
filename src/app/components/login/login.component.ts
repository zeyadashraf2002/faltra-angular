// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
      this.router.navigate(['/dashboard/companies']);
    }

    // Get return url from route parameters
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

    this.authService.login(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success(
            'مرحباً!',
            `أهلاً بك ${response.data.user.fullName}`
          );

          // تحقق من نوع المستخدم
          if (response.data.user.role === 'developer') {
            // Check if React frontend is available
            this.authService.checkReactFrontendAvailable().then(isAvailable => {
              if (isAvailable) {
                window.location.href = environment.APP_URL;
              } else {
                this.router.navigate([this.returnUrl]);
              }
            });
          } else {
            this.router.navigate([this.returnUrl]);
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        const errorMsg = error.error?.message || 'خطأ في تسجيل الدخول';
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