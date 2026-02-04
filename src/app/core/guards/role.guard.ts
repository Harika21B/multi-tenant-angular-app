import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getCurrentUser();
  const requiredRole = route.data?.['role'];

  if (!currentUser) {
    return router.createUrlTree(['/login']);
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // User doesn't have required role, redirect to dashboard
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};