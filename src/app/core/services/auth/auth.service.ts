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

  login(email: string, password: string) {
    return this.http.post<string>(authEnvironement.login, { email, password }, { responseType: 'text' as 'json' });
  }  

  register(firstname: string, lastname: string, email: string, password: string, role: string, createdAt: string, accessKey: string): Observable<boolean> {
    return this.http.post<boolean>(authEnvironement.register, { firstname, lastname, email, password, role, createdAt, accessKey });
  }

  getUserToken() : string {
    return localStorage.getItem('token') || '';
  }

  setUserToken(token: string) {
    localStorage.setItem('token', token);

    this.setUserEmail(token);
    this.setUserUsername(token);
    this.setUserRole(token);
    this.setUserId(token);
  }

  setUserEmail(token: string) {
    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.email; // Utilizează `email` așa cum apare în payload
    localStorage.setItem('email', email);
  }

  getUserEmail(): string {
    return localStorage.getItem('email')!;
  }

  setUserUsername(token: string) {
    const decodedToken: any = jwtDecode(token);
    const username = decodedToken.username; // Utilizează `username` așa cum apare în payload
    localStorage.setItem('username', username);
  }

  getUserUsername(): string {
    return localStorage.getItem('username')!;
  }

  setUserRole(token: string) {
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken.roles; // Utilizează `roles` așa cum apare în payload
    localStorage.setItem('role', role);
  }

  getUserRole(): string {
    const role = localStorage.getItem('role') || '';
    console.log('Retrieved Role:', role); // Verifică valoarea returnată
    return role;
  }

  setUserId(token: string) {
    const decodedToken: any = jwtDecode(token);
    const id = decodedToken.sub; 
    localStorage.setItem('userId', id);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.clear();
  }

  getUserId() : number {
    return Number(localStorage.getItem('userId'));
  }
}