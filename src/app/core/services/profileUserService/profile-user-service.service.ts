import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserServiceService {

  constructor(private http: HttpClient) { }

  getUserData(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api_base_url}${environment.profile_user_endpoint}/${id}`);
  }

  updateUserProfile(userProfile: User): Observable<any> {
    return this.http.put(`${environment.api_base_url}${environment.profile_user_endpoint}/${userProfile.username}`, userProfile);
  }

  changePassword(passwordData: { currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${environment.api_base_url}/auth/change-password`, passwordData);
  }
}
