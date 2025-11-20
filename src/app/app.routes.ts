// 📁 src/app/app.routes.ts (Fixed)
import { Routes } from '@angular/router';
import { AuthGuard, DeveloperGuard } from './guards/auth.guard';

export const routes: Routes = [
  // ✅ المسار الرئيسي - لن يفعل شيء (Landing Page ستظهر من app.component)
  // نحتاج component فارغ أو نحذف هذا السطر تماماً
  
  // 🔹 تسجيل دخول المستخدمين العاديين (Manager, Employee)
  { 
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },
  // 🔹 تسجيل دخول المطورين فقط
  { 
    path: 'dev-login',
    loadComponent: () => import('./components/login-dev/login-dev.component')
      .then(m => m.LoginDevComponent)
  },
  { 
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  // 🔹 Dashboard للشركات (يتطلب تسجيل دخول)
  { 
    path: 'dashboard/companies',
    loadComponent: () => import('./components/companies/companies.component')
      .then(m => m.CompaniesComponent),
    canActivate: [AuthGuard]
  }
];