import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const user = authService.getCurrentUser();
  const router = inject(Router)
  if(user.id) {
    return true;
  }
  router.navigateByUrl('/login')
  return false;
};
