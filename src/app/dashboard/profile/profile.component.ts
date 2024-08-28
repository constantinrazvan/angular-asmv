import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/models/User';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  formattedDate: string = ''; // Adăugați un câmp pentru data formatată
  id: number = this.authService.getUserId();

  constructor(
    private route: ActivatedRoute,
    private service: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  initial: string = this.getInitial(this.user.lastname);

  getUser(): void {
    this.service.getOneUser(this.id).subscribe({
      next: (data: User) => {
        this.user = data;
        // Convertim data creării contului dacă este disponibilă
        if (this.user.created_at) {
          this.formattedDate = this.formatDate(this.user.created_at);
        }
        console.log('Data retrieved successfully', this.user);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  formatDate(date: Date): string {
    if (!date) {
      return ''; // sau orice altă valoare implicită
    }
    const isoDate = new Date(date);
    const day = String(isoDate.getDate()).padStart(2, '0');
    const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Luni încep de la 0
    const year = isoDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  editUser(): void {
    this.service.updateUser(this.id, this.user).subscribe({
      next: (data) => {
        console.log('Data updated successfully', data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getInitial(name: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '';
  }

  logout(): void {
    this.authService.logout();
  }

  changeEmail(): void {}
  changePassword(): void {}
}