import { Component } from '@angular/core';
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
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(
    private route: ActivatedRoute,
    private service: UsersService,
    private authService: AuthService
  ) {}

  user: User = {} as User;

  id = localStorage.getItem('userId');

  getUser() : void { 
    this.service.getOneUser(Number(this.id)).subscribe({
      next: (data) => { 
        this.user = data;
        console.log("Data retrived successfully", this.user);
      }, 
      error: (error) => { 
        console.log(error);
      }
    })
  }

  editUser() : void { 
    this.service.updateUser(Number(this.id), this.user).subscribe({
      next: (data) => { 
        console.log("Data updated successfully", data);
      }, 
      error: (error) => { 
        console.log(error);
      }
    })
  }

  getInitial(name: string): string {
    if (name && name.length > 0) {
        return name.charAt(0).toUpperCase();
    }
    return '';
  }

  logout() : void { 
    this.authService.logout();
  }

  changeEmail() : void {}
  changePassword() : void {}

}