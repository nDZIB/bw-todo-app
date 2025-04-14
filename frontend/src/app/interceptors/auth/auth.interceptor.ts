import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getCurrentUser().token;

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken || ''}`)
  });

  // send cloned request with header to the next handler.
  return next(authReq);
};
