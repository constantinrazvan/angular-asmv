import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Register } from '../../models/Register';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'token'; // Key used to store the token
  private readonly apiUrl = 'https://localhost:7155/api/auth'; // Base URL for the authentication API

  loginEmpty: Login = {
    email: '',
    password: ''
   };

   registerEmpty: Register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: '',
    faculty: '',
    status: ''
   }

  constructor(private http: HttpClient) { }

  register(register: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/register`, register);
  }

  login(login: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login).pipe(
      tap(response => {
        if (response?.token) {
          this.setToken(response.token); // Store token
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken(); // Clear token
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Store token
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey); // Remove token
  }
}
