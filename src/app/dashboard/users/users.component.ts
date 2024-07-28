import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service'; 
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
  showConfirmDeleteModal: boolean = false; 
  userToDelete: User | null = null; 
  newPassword: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  refreshData(): void {
    location.reload();
  }

  private getToken(): string | null {
    return this.authService.getToken(); 
  }

  loadUsers(): void {
    const token = this.getToken();
    if (token) {
      this.userService.getAllUsers(token).subscribe({
        next: (data: any) => {
          console.log('Users data structure:', data);
          if (data && Array.isArray(data.$values)) {
            this.users = this.reversedUsers(data.$values);
          } else {
            console.error('Unexpected data format:', data);
          }
          console.log('Users loaded:', this.users);
        },
        error: (error) => {
          console.error('Error fetching users', error);
        }
      });
    } else {
      console.error('No token found. User may not be logged in.');
    }
  }

  reversedUsers(data: User[]): User[] {
    let stack: User[] = [];
    for (let user of data) {
      stack.push(user);
    }

    let reversedUsers: User[] = [];
    while (stack.length > 0) {
      reversedUsers.push(stack.pop()!);
    }

    return reversedUsers;
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.showChangePasswordModal = false;
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
  }

  changePassword(): void {
    if (this.selectedUser && this.newPassword) {
      const token = this.getToken();
      if (token) {
        this.userService.updatePasswordWithoutOld(this.newPassword, this.selectedUser.id, token).subscribe({
          next: () => {
            this.closeChangePasswordModal();
            this.loadUsers(); 
          },
          error: (error) => {
            console.error('Error changing password', error);
          }
        });
      } else {
        console.error('No token found. Cannot change password.');
      }
    }
  }

  confirmDelete(userId: number): void {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      this.userToDelete = user;
      this.showConfirmDeleteModal = true;
    }
  }

  deleteUser(): void {
    if (this.userToDelete) {
      const userId = this.userToDelete.id;
      const token = this.getToken();
      if (token) {
        this.userService.deleteUser(userId, token).subscribe({
          next: () => {
            this.loadUsers(); 
            this.closeConfirmDeleteModal();
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            alert('Nu s-a putut șterge utilizatorul. Vă rugăm încercați din nou.');
          }
        });
      } else {
        console.error('No token found. Cannot delete user.');
      }
    }
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.userToDelete = null;
  }
}
