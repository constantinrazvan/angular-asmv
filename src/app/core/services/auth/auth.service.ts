import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authEnvironement } from '../../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(authEnvironement.login, { email, password }, { responseType: 'text' as 'json' });
  }  

  register(firstname: string, lastname: string, email: string, password: string, role: string, createdAt: string, accessKey: string): Observable<boolean> {
    return this.http.post<boolean>(authEnvironement.register, { firstname, lastname, email, password, role, createdAt, accessKey });
  }

  getUserToken(): string {
    return localStorage.getItem('token') || '';
  }

  setUserToken(token: string): void {
    localStorage.setItem('token', token);
    this.setUserDetails(token);
  }

  private setUserDetails(token: string): void {
    const decodedToken: any = jwtDecode(token);
    localStorage.setItem('email', decodedToken.email);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('role', decodedToken.roles);
    localStorage.setItem('userId', decodedToken.sub);
  }

  getUserEmail(): string {
    return localStorage.getItem('email') || '';
  }

  getUserUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId')) || 0;
  }

  isLoggedIn(): boolean {
    return !!this.getUserToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }
}