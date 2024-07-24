import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Register } from '../../models/Register';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginEmpty: Login = {
    email: '',
    password: ''
  };

  registerEmpty: Register = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    phoneNumber: '',
    faculty: '',
    status: ''
  };

  register(register: Register): Observable<Register> {
    return this.http.post<Register>('https://localhost:7155/api/auth/register', register);
  }

  login(login: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('https://localhost:7155/api/auth/login', login).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store token
        }
      })
    );
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }  
}