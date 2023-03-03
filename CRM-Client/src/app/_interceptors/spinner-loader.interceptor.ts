import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderServiceService } from '../_services/loader-service.service';

@Injectable()
export class SpinnerLoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.loaderService.idle();
      })
    );
  }
}
