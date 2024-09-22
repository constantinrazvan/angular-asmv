import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { authEnvironment } from '../../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(authEnvironment.login, { email, password }, { responseType: 'text' as 'json' })
        .pipe(
            tap(token => {
                this.setUserToken(token); // Salvează tokenul
            })
        );
}
 

  register(firstname: string, lastname: string, email: string, password: string, role: string, createdAt: string, accessKey: string): Observable<boolean> {
    return this.http.post<boolean>(authEnvironment.register, { firstname, lastname, email, password, role, createdAt, accessKey });
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(authEnvironment.getProfile(id));
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
    localStorage.setItem('username', decodedToken.firstname); // Verifică dacă această cheie există
    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem('userId', decodedToken.userId); // Asigură-te că aceasta există
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

    window.location.reload();
  }
}
