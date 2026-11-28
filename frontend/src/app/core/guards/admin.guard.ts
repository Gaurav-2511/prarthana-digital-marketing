import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('access_token');
  const role = sessionStorage.getItem('admin_role');

  if (token && role === 'ADMIN') {
    return true;
  }

  return router.createUrlTree(['/admin/login']);
};
