// 📁 src/app/guards/auth.guard.ts - REDIRECT TO DEV-LOGIN
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

// ✅ AuthGuard - Redirects to /dev-login if not authenticated
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔐 AuthGuard: Checking authentication...', {
    isAuthenticated: authService.isAuthenticated,
    currentUser: authService.currentUser,
    requestedUrl: state.url
  });

  if (authService.isAuthenticated) {
    // Check if user has required role
    const requiredRole = route.data['role'] as string;
    
    if (requiredRole && authService.currentUser?.role !== requiredRole) {
      console.log('❌ AuthGuard: Role mismatch, redirecting to /unauthorized');
      router.navigate(['/unauthorized']);
      return false;
    }
    
    console.log('✅ AuthGuard: Access granted');
    return true;
  }

  // ✅ Not logged in, redirect to /dev-login
  console.log('❌ AuthGuard: Not authenticated, redirecting to /dev-login');
  router.navigate(['/dev-login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// ✅ DeveloperGuard - For developer-only routes
export const DeveloperGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isDeveloper) {
    return true;
  }
  
  router.navigate(['/unauthorized']);
  return false;
};