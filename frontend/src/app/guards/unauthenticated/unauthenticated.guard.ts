import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const user = authService.getCurrentUser();
  const router = inject(Router)
  if (user.id) {
    router.navigateByUrl('/dashboard')
    return false;
  }
  return true;

};
