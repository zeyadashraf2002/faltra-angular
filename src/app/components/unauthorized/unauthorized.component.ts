// 📁 src/app/components/unauthorized/unauthorized.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="unauthorized-container min-vh-100 d-flex align-items-center justify-content-center" dir="rtl">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center">
            <div class="card border-0 shadow-lg rounded-4 p-5">
              <i class="bi bi-shield-x text-danger" style="font-size: 5rem;"></i>
              <h1 class="mt-4 mb-3">غير مصرح</h1>
              <p class="text-muted mb-4">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
              <button class="btn btn-primary btn-lg" (click)="goBack()">
                <i class="bi bi-arrow-right me-2"></i>
                العودة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}