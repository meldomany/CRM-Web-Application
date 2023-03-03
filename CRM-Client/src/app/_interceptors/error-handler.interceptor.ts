import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(response => {
        if(response){
          switch(response.status) {
            case 400:
              if(response.error.errors){
                // response.error.errors.forEach((error: any) => {
                //   Swal.fire({
                //     position: 'top-end',
                //     icon: 'error',
                //     title: error,
                //     showConfirmButton: false,
                //     timer: 2000
                //   })
                // });
                const modalStateErrors = [];
                for(const error in response.error.errors){
                  if(response.error.errors[error]){
                    modalStateErrors.push(response.error.errors[error]);
                  }
                }
                throw modalStateErrors.flat();
              }else if(typeof(response.error) === 'object'){
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: response.error,
                  showConfirmButton: false,
                  timer: 2000
                })
              }
              else{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: response.error,
                  showConfirmButton: false,
                  timer: 2000
                })
              }
              break;
            case 401:
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: response.error,
                showConfirmButton: false,
                timer: 2000
              });
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: {error: response.error}};
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something unexpected went wrong',
                showConfirmButton: false,
                timer: 2000
              });
              console.log(response);
              break;
          }
        }
        return throwError(response);
      })
    );
  }
}
