import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuard implements CanActivate {
  
  constructor(private authService: AuthenticationService, private jwtHelper: JwtHelperService){}

  canActivate(): Observable<boolean> {    
    return this.authService.currentUser$.pipe(map(response => {
      if(response?.token != null && !this.jwtHelper.isTokenExpired(response?.token)){
        return true;
      }else {
        this.authService.logout();
        return false;
      }
    }));
  }
  
}
