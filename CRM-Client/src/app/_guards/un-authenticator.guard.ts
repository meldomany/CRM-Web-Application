import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticatorGuard implements CanActivate {
  
  constructor(private authService: AuthenticationService){}

  canActivate(): Observable<boolean> {    
    return this.authService.currentUser$.pipe(map(response => {
      if(response?.token == null){
        return true;
      }else {
        return false;
      }
    }));
  }
}
