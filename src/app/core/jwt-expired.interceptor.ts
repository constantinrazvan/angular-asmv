import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export const jwtExpiredInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  const token = authService.getUserToken();

  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        authService.logout(); 
        return throwError(() => new Error('JWT token has expired'));
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      authService.logout();
      return throwError(() => new Error('Invalid JWT token'));
    }
  }

  return next(req);
};
