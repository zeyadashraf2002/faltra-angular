// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated) {
      // Check if user has required role
      const requiredRole = route.data['role'] as string;
      
      if (requiredRole && this.authService.currentUser?.role !== requiredRole) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      return true;
    }

    // Not logged in, redirect to login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}

// src/app/guards/developer.guard.ts
@Injectable({
  providedIn: 'root'
})
export class DeveloperGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isDeveloper) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}