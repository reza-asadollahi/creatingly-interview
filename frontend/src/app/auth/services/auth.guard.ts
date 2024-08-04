import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthTokenService } from "./auth-token.service";

export const authGuardCanActivateFN: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService: AuthTokenService = inject(AuthTokenService);
  const router: Router = inject(Router);
  if (tokenService.token) {
    return true
  } else {
    return router.parseUrl('/auth')
  }
}


export const authGuardCanActivateChildFN: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService: AuthTokenService = inject(AuthTokenService);
  const router: Router = inject(Router);
  if (tokenService.token) {
    return true
  } else {
    return router.parseUrl('/auth')
  }
}
