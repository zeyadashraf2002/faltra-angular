// 📁 src/app/app.routes.ts (Updated with company details route)
import { Routes } from '@angular/router';
import { AuthGuard, DeveloperGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🔹 Login routes
  { 
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },
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
  
  // 🔹 Dashboard routes (protected)
  { 
    path: 'dashboard/companies',
    loadComponent: () => import('./components/companies/companies.component')
      .then(m => m.CompaniesComponent),
    canActivate: [AuthGuard]
  },
  
  // 🔹 NEW: Company details route
  { 
    path: 'dashboard/companies/:id',
    loadComponent: () => import('./components/company-details/company-details.component')
      .then(m => m.CompanyDetailsComponent),
    canActivate: [AuthGuard]
  },
  
  // 🔹 Default redirect
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  // 🔹 Wildcard route
  {
    path: '**',
    redirectTo: '/login'
  }
];