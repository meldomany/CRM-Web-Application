import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authService.currentUser$.pipe(take(1)).subscribe(response => {
      if(response?.token != null){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.token}`
          }
        })
      }
    });
    return next.handle(request);
  }
}
