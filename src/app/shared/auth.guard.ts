import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRol = route.data['rol'] as 'ADMIN' | 'USUARIO';

  if (auth.getRol() === expectedRol) {
    return true;
  }

  // Redirigir automáticamente al módulo correcto
  const redirectTo = expectedRol === 'ADMIN' ? '/usuario' : '/admin';
  return router.createUrlTree([redirectTo]);
};
