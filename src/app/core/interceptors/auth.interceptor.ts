import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.getCurrentUser();
  
  // Add authorization header if user is logged in
  if (currentUser && currentUser.token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`,
        'X-Tenant-ID': currentUser.tenantId
      }
    });
    return next(cloned);
  }
  
  return next(req);
};