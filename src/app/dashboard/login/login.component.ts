import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth.service';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  email: string = ''; 
  password: string = '';
  error: string = '';

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) {}

  login(): void {
    if (this.email && this.password) {
      let user: Partial<User> = {
        email: this.email,
        password: this.password
      };

      this.authservice.login(user).subscribe({
        next: (response) => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.error = 'Login failed. Please try again.';
        }
      });
    }
  }
}