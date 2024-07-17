import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ProfileUserServiceService } from '../../core/services/profileUserService/profile-user-service.service';
import { User } from '../../core/interfaces/User'; // Ensure this path is correct
import { jwtDecode } from 'jwt-decode';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

@Component({
  standalone: true,
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatSelectModule
  ]
})
export class ProfileUserComponent implements OnInit {

  constructor(private profileService: ProfileUserServiceService) { }

  userProfile: User = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    status: ''
  };

  passwordData: PasswordData = {
    currentPassword: '',
    newPassword: ''
  };

  ngOnInit(): void {
    const userId = this.getUserId();
    if (userId !== null) {
      this.getUserData(userId);
    } else {
      console.error('User ID not found');
    }
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: { id: number } = jwtDecode(token);
        return decoded.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }

    return null;
  }

  getUserData(id: number): void {
    
  }

  saveProfile(): void {
    
  }

  changePassword(): void {
    
  }
}
