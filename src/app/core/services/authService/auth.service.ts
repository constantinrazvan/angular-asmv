import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private route: Router
  ) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  getUser(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user: any = jwtDecode(token);
        return user.username;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  register(user: User): Observable<User | null> {
    if (user.firstname && user.lastname && user.email && user.password && user.status) {
      return this.httpClient.post<User>(`${environment.api_base_url}${environment.register_endpoint}`, user);
    } else {
      return of(null);
    }
  }

  login(user: Partial<User>): Observable<{ token: string } | null> {
    if (user.email && user.password) {
      return this.httpClient.post<{ token: string }>(`${environment.api_base_url}${environment.login_endpoint}`, user);
    } else {
      return of(null);
    }
  }
}
