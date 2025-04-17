import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('token')) {
      return true;
    }
    _Router.navigate(['/login']);
    return false;
  }
  return false;
};
