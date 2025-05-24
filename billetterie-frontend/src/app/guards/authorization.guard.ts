
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.roles.includes('ROLE_ADMIN')||this.authService.roles.includes('ROLE_ORGANIZER')) {
      return true;
    } else {
      this.router.navigateByUrl('/not-authorized');
      return false;
    }
    
  }

}



export const authorizationGuard: CanActivateFn = (route, state) => {
  return true;
};