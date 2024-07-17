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

  getUserData(id: number): void {
     
  }

  updateUserProfile(userProfile: User): void {
  }

  changePassword(passwordData: { currentPassword: string, newPassword: string }): void {
  }
}
