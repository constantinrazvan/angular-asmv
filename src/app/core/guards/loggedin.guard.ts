import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(AuthService)

  const token = service.getUserToken();
  const role = service.getUserRole();
  const userId = service.getUserId();
  const username = service.getUserUsername();
  const email = service.getUserEmail();

  if (token && role && userId && username && email) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
