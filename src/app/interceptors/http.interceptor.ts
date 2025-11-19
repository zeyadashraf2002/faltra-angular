// src/app/interceptors/http.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log request
    console.log(`🚀 [${req.method}] ${req.url}`);
    
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ HTTP Error:', error);

        // Handle 401 Unauthorized
        if (error.status === 401 && !req.url.includes('/login')) {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
          this.toastService.error(
            'غير مصرح',
            'جلستك انتهت. يرجى تسجيل الدخول مرة أخرى'
          );
        }

        // Handle 403 Forbidden
        if (error.status === 403) {
          this.toastService.error(
            'ممنوع',
            error.error?.message || 'ليس لديك صلاحية للوصول لهذا المورد'
          );
        }

        // Handle 404 Not Found
        if (error.status === 404) {
          this.toastService.error(
            'غير موجود',
            error.error?.message || 'المورد المطلوب غير موجود'
          );
        }

        // Handle 500 Server Error
        if (error.status === 500) {
          this.toastService.error(
            'خطأ في الخادم',
            'حدث خطأ في الخادم. يرجى المحاولة لاحقاً'
          );
        }

        return throwError(() => error);
      })
    );
  }
}