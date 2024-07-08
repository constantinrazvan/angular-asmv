import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

interface UserProfile {
  nume: string;
  prenume: string;
  email: string;
  parola: string;
  role: string;
  status: string;
  createdAt: string;
}

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
  userProfile: UserProfile = {
    nume: '',
    prenume: '',
    email: '',
    parola: '',
    role: '',
    status: '',
    createdAt: ''
  };

  passwordData: PasswordData = {
    currentPassword: '',
    newPassword: ''
  };

  ngOnInit(): void {
    // Fetch the user profile data (e.g., from a service)
    // For now, we'll use dummy data
    this.userProfile = {
      nume: 'Popescu',
      prenume: 'Ion',
      email: 'ion.popescu@example.com',
      parola: '',
      role: 'voluntar',
      status: 'Membru Voluntar',
      createdAt: '2024-07-08'
    };
  }

  saveProfile(): void {
    // Save the user profile data (e.g., to a service)
    console.log('Profile saved', this.userProfile);
  }

  changePassword(): void {
    // Change the user's password
    console.log('Password changed', this.passwordData);
  }
}
