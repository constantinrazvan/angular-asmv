import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/User';
import { UsersService } from '../../../core/services/users/users.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: User = {} as User;
  isEditing: boolean = false;
  role: string = "Membru Voluntar";

  constructor(
    private service: UsersService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID');
      return;
    }

    this.service.getOneUser(id).subscribe({
      next: (data) => {
        const createdAt = data.created_at ? new Date(data.created_at) : null;

        this.user = {
          ...data,
          created_at: createdAt
        };

        console.log('User data fetched successfully', this.user);
      },
      error: (e) => {
        console.error('Failed to fetch user data', e);
      }
    });
  }  

  editUser(): void {
    this.isEditing = true;
  }

  saveUser(): void {
    this.service.updateUser(this.user.id!, this.user).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.isEditing = false;

        localStorage.setItem('email', this.user.email!);
        localStorage.setItem('username', `${this.user.firstname} ${this.user.lastname}`);
        localStorage.setItem('role', this.user.role!);
        localStorage.setItem('userId', String(this.user.id!));

        this.auth.setUserEmail(this.user.email!);
        this.auth.setUserRole(this.user.role!);
        this.auth.setUserId(String(this.user.id!));
        this.auth.setUserUsername(`${this.user.firstname} ${this.user.lastname}`);
      },
      error: (e) => {
        console.error('Failed to update user', e);
      }
    });
  }

  cancelEdit(): void {
    this.getUser();
    this.isEditing = false;
  }

  deleteUser(): void {
    const confirmed = window.confirm('Sigur dorești să ștergi acest utilizator?');
  
    if (confirmed) {
      this.service.deleteUser(this.user.id!).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/dashboard/utilizatori']);
        },
        error: (e) => {
          console.error('Failed to delete user', e);
        }
      });
    } else {
      console.log('User deletion canceled');
    }
  }
  
  formatDate(date: Date | null): string {
    if (!date) return 'N/A';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  checkUserRole(): boolean { 
    const currentUserRole = this.auth.getUserRole();
    const targetUserRole = this.user.role;
  
    if (currentUserRole === "admin" && targetUserRole !== "admin") {
      return true;
    }
    
    if (currentUserRole === "Membru Adunarea Generala" &&
        targetUserRole !== "Membru Adunarea Generala" &&
        targetUserRole !== "admin") {
      return true;
    }
    
    return false;
  }  
}