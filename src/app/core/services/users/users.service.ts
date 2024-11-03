import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = 'http://localhost:5235/api/Users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Get authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get a single user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all-users`, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete-user/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update a user by ID with a User object
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${id}`, user, {
      headers: this.getAuthHeaders()
    });
  }

  // Update a user's email by ID
  userChangeEmail(id: number, email: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.baseUrl}/update-email/${id}`, { email }, {
      headers: this.getAuthHeaders()
    });
  }

  // Update a user's password by ID
  userChangePassword(id: number, password: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.baseUrl}/update-password/${id}`, { password }, {
      headers: this.getAuthHeaders()
    });
  }

  // Get the total count of users
  countUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users-count`, {
      headers: this.getAuthHeaders()
    });
  }
}