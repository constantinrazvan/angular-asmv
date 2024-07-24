import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/User'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  showChangePasswordModal: boolean = false;
  newPassword: string = '';
  oldPassword: string = '';
  jwtToken: string = ''; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Retrieve JWT token from a service or storage
    this.jwtToken = 'your-jwt-token'; // Replace with actual token retrieval logic
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers(this.jwtToken).subscribe({
        next: (data) => {
            this.users = data;
            console.log('Users loaded:', this.users); // Verify user IDs are present
            this.users.forEach(user => {
                console.log(`User ID: ${user.id}`); // Check if IDs are present
            });
        },
        error: (error) => {
            console.error('Error fetching users', error);
        }
    });
}

  viewUser(user: User): void {
    this.selectedUser = user;
    this.showChangePasswordModal = false; // Ensure change password modal is closed
  }

  closeViewModal(): void {
    this.selectedUser = null;
  }

  openChangePasswordModal(user: User): void {
    this.selectedUser = user;
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
    this.newPassword = '';
    this.oldPassword = '';
  }

  changePassword(): void {
    if (this.selectedUser && this.oldPassword && this.newPassword) {
      const updatePasswordDto = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.userService.updatePassword(updatePasswordDto, this.jwtToken).subscribe({
        next: () => {
          this.closeChangePasswordModal();
        },
        error: (error) => {
          console.error('Error changing password', error);
        }
      });
    }
  }

  deleteUser(userId: number): void {
    console.log('Attempting to delete user with ID:', userId); // Check the ID being passed
    if (userId === undefined || userId === null) {
        console.error('Invalid user ID:', userId);
        return;
    }
    if (confirm('Are you sure you want to delete this user?')) { // Confirm before deleting
        this.userService.deleteUser(userId, this.jwtToken).subscribe({
            next: () => {
                this.loadUsers(); // Reload users after deletion
            },
            error: (error) => {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.'); // Provide user feedback
            }
        });
    }
}
}