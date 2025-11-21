// 📁 src/app/app.routes.ts - PROTECTED DEV-LOGIN ROUTE
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🔹 Home route - Landing page
  { 
    path: '',
    pathMatch: 'full',
    children: []
  },
  
  // 🔹 PROTECTED: Dev-Login route (hidden from regular users)
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
  
  // 🔹 Dashboard routes (protected by AuthGuard)
  { 
    path: 'dashboard/companies',
    loadComponent: () => import('./components/companies/companies.component')
      .then(m => m.CompaniesComponent),
    canActivate: [AuthGuard]
  },
  
  { 
    path: 'dashboard/companies/:id',
    loadComponent: () => import('./components/company-details/company-details.component')
      .then(m => m.CompanyDetailsComponent),
    canActivate: [AuthGuard]
  },

  // 🔹 Redirect unknown routes to home
  { 
    path: '**', 
    redirectTo: '' 
  }
];