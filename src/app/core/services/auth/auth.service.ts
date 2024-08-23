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

  login(email: string, password: string) : Observable<any> {
    return this.http.post(authEnvironement.login, {email, password});
  }

  register(firstname: string, lastname: string, email: string, password: string, role: string, createdAt: string) : Observable<any> {
    return this.http.post(authEnvironement.register, {firstname, lastname, email, password, role, createdAt});
  }

  setUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUserEmail(token: string) {
    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.Email;
    localStorage.setItem('email', email);
  }

  setUserUsername(token: string) {
    const decodedToken: any = jwtDecode(token);
    const username = decodedToken.Username;
    localStorage.setItem('username', username);
  }

  setUserRole(token: string) {
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken.Role;
    localStorage.setItem('role', role);
  }

  setUserId(token: string) {
    const decodedToken: any = jwtDecode(token);
    const id = decodedToken.userId;
    localStorage.setItem('userId', id);
  }

  isLoggedIn() { 
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
}
