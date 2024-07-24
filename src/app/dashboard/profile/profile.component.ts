import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service'; // Adjust the path if necessary
import { User } from '../../core/models/User';
import { UpdatePasswordDTO } from '../../core/models/UserPasswordDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    faculty: '',
    status: ''
  };
  isEditingProfile = false;
  isChangingPassword = false;
  passwords = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private getJwtToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      console.error('JWT token is not available.');
      return ''; 
    }
  }  

  loadUserProfile(): void {
    const jwtToken = this.getJwtToken();
    if (!jwtToken) {
      console.error('JWT token is missing.');
      return;
    }
    this.userService.getUserProfile(jwtToken).subscribe({
      next: (user: User) => this.user = user,
      error: (err) => {
        console.error('Error loading user profile', err);
        alert('Failed to load user profile.');
      }
    });
  }  

  updateProfile(): void {
    const jwtToken = this.getJwtToken();
    if (!jwtToken) {
      console.error('JWT token is missing.');
      return;
    }
    this.userService.updateUserProfile(this.user, jwtToken).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.isEditingProfile = false;
      },
      error: (err) => console.error('Error updating profile', err)
    });
  }

  changePassword(): void {
    if (this.passwords.newPassword !== this.passwords.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }

    const updatePasswordDto: UpdatePasswordDTO = {
      oldPassword: this.passwords.oldPassword,
      newPassword: this.passwords.newPassword
    };

    const jwtToken = this.getJwtToken();
    if (!jwtToken) {
      console.error('JWT token is missing.');
      return;
    }
    this.userService.updatePassword(updatePasswordDto, jwtToken).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.isChangingPassword = false;
        this.passwords = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
      },
      error: (err) => console.error('Error changing password', err)
    });
  }

  openEditProfileModal(): void {
    this.isEditingProfile = true;
  }

  openChangePasswordModal(): void {
    this.isChangingPassword = true;
  }
}
