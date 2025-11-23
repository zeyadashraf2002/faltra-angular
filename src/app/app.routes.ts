// 📁 src/app/app.routes.ts - COMPLETE WITH DASHBOARD
import { Routes } from '@angular/router';
import { AuthGuard, DeveloperGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🔹 Home route - Landing page
  { 
    path: '',
    pathMatch: 'full',
    children: []
  },
  
  // 🔹 PROTECTED: Dev-Login route
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

  // 🆕 NEW: Subscription Dashboard (Developer Only)
  { 
    path: 'dashboard/subscriptions',
    loadComponent: () => import('./components/subscription-dashboard/subscription-dashboard.component')
      .then(m => m.SubscriptionDashboardComponent),
    canActivate: [AuthGuard, DeveloperGuard]
  },

  // 🔹 Redirect unknown routes to home
  { 
    path: '**', 
    redirectTo: '' 
  }
];