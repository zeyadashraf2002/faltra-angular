// 📁 src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

// AuthGuard - Functional Guard
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    // Check if user has required role
    const requiredRole = route.data['role'] as string;
    
    if (requiredRole && authService.currentUser?.role !== requiredRole) {
      router.navigate(['/unauthorized']);
      return false;
    }
    
    return true;
  }

  // Not logged in, redirect to login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// DeveloperGuard - Functional Guard
export const DeveloperGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isDeveloper) {
    return true;
  }
  
  router.navigate(['/unauthorized']);
  return false;
};