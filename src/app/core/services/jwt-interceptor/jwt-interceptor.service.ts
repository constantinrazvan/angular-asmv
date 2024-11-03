import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        if (event.headers.get('Token-Expired') === 'true') {
          authService.logout();
        }
      }
    }, error => {
      if (error.status === 401) {
        authService.logout();
      }
    })
  );
};