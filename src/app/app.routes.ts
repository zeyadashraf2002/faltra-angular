// 📁 src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard, DeveloperGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: ''
  },
  { 
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent)
  },
  { 
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  { 
    path: 'dashboard/companies',
    loadComponent: () => import('./components/companies/companies.component')
      .then(m => m.CompaniesComponent),
    canActivate: [AuthGuard]
  }
];