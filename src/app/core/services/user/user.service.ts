import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { UpdatePasswordDTO } from '../../models/UserPasswordDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7155/api/User'; // Make sure this matches the backend route

  constructor(private http: HttpClient) { }

  getAllUsers(jwtToken: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<User[]>(`${this.apiUrl}/all`, { headers }); // Adjusted endpoint
  }

  getUserProfile(jwtToken: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
  }

  updateUserProfile(user: User, jwtToken: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.put<User>(`${this.apiUrl}/profile`, user, { headers });
  }

  updatePassword(updatePasswordDto: UpdatePasswordDTO, jwtToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.put<any>(`${this.apiUrl}/change-password`, updatePasswordDto, { headers });
  }

  deleteUser(userId: number, jwtToken: string): Observable<void> {
    console.log('Deleting user with ID:', userId); // Add logging here
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, { headers });
  }
}
