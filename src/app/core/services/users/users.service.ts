import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { usersEnvironment } from '../../environment'; // Corrected import
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
    return this.http.get<User[]>(usersEnvironment.getAllUsers, {
      headers: this.getAuthHeaders()
    });
  }

  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(usersEnvironment.getUser(id), {
      headers: this.getAuthHeaders()
    });
  }  

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`http://localhost:5235/api/Users/delete-user/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(usersEnvironment.updateUser(id), user, {
      headers: this.getAuthHeaders()
    });
  }

  userChangeEmail(id: number, newEmail: string, oldEmail: string): Observable<boolean> {
    return this.http.patch<boolean>(usersEnvironment.updateEmail(id), { newEmail, oldEmail }, {
      headers: this.getAuthHeaders()
    });
  }

  userChangePassword(id: number, newPassword: string, oldPassword: string): Observable<boolean> {
    return this.http.patch<boolean>(usersEnvironment.updatePassword(id), { newPassword, oldPassword }, {
      headers: this.getAuthHeaders()
    });
  }
}