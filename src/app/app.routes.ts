// 📁 src/app/app.routes.ts (FIXED - Home page accessible without login)
import { Routes } from '@angular/router';
import { AuthGuard, DeveloperGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🔹 Public routes (no authentication required)
  { 
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./app.component').then(m => [
      { path: '', component: m.AppComponent }
    ])
  },
  
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
  
  // 🔹 Company details route
  { 
    path: 'dashboard/companies/:id',
    loadComponent: () => import('./components/company-details/company-details.component')
      .then(m => m.CompanyDetailsComponent),
    canActivate: [AuthGuard]
  }
];