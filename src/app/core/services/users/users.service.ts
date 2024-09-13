import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { adminEnvironment, userEnvironment } from '../../environment';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  // Method to get authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(userEnvironment.getAll, {
      headers: this.getAuthHeaders()
    });
  }

  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(userEnvironment.getOne + id, {
      headers: this.getAuthHeaders()
    });
  }  

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(userEnvironment.deleteOne + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(userEnvironment.update + id, user, {
      headers: this.getAuthHeaders()
    });
  }

  userChangeEmail(id: number, newEmail: string, oldEmail: string): Observable<boolean> {
    return this.http.patch<boolean>(userEnvironment.userChangeEmail + id, { newEmail, oldEmail }, {
      headers: this.getAuthHeaders()
    });
  }

  userChangePassword(id: number, newPassword: string, oldPassword: string): Observable<boolean> {
    return this.http.patch<boolean>(userEnvironment.userChangePassword + id, { newPassword, oldPassword }, {
      headers: this.getAuthHeaders()
    });
  }

  adminChangePassword(email: string, password: string, accesskey: string): Observable<boolean> {
    return this.http.patch<boolean>(adminEnvironment.changeEmailUser, { email, password, accessKey: accesskey }, {
      headers: this.getAuthHeaders()
    });
  }
}