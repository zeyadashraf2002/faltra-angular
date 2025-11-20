// 📁 src/app/interceptors/http.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  // Log request
  console.log(`🚀 [${req.method}] ${req.url}`);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('❌ HTTP Error:', error);

      // Handle 401 Unauthorized
      if (error.status === 401 && !req.url.includes('/login')) {
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
        toastService.error(
          'غير مصرح',
          'جلستك انتهت. يرجى تسجيل الدخول مرة أخرى'
        );
      }

      // Handle 403 Forbidden
      if (error.status === 403) {
        toastService.error(
          'ممنوع',
          error.error?.message || 'ليس لديك صلاحية للوصول لهذا المورد'
        );
      }

      // Handle 404 Not Found
      if (error.status === 404) {
        toastService.error(
          'غير موجود',
          error.error?.message || 'المورد المطلوب غير موجود'
        );
      }

      // Handle 500 Server Error
      if (error.status === 500) {
        toastService.error(
          'خطأ في الخادم',
          'حدث خطأ في الخادم. يرجى المحاولة لاحقاً'
        );
      }

      return throwError(() => error);
    })
  );
};