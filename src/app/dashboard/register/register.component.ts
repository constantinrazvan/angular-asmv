import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth.service';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = '';
  confirmPassword: string = '';
  confirmEmail: string = '';
  user: User = {} as User;
  key: string = '';

  statusLabels = {
    'membru_adunarea_generala': 'MEMBRU_ADUNAREA_GENERALA',
    'membru_consiliu_directorial': 'MEMBRU_CONSILIU_DIRECTORIAL',
    'membru_de_onoare': 'MEMBRU_DE_ONOARE',
    'membru_voluntar': 'MEMBRU_VOLUNTAR'
  };

  constructor(
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.user.username = '';
    this.user.firstname = '';
    this.user.lastname = '';
    this.user.email = '';
    this.confirmEmail = '';
    this.confirmPassword = '';
    this.user.password = '';
    this.user.status = '';
    this.error = '';
    this.key = '';
  }

  private validator(): boolean {
    if (this.user.username === '' || this.user.firstname === '' || this.user.lastname === '' || this.user.email === '' || this.confirmEmail === '' || this.user.password === '' || this.key === '') {
      this.error = 'Toate campurile trebuie completate';
      return false;
    } else if (this.user.email !== this.confirmEmail) {
      this.error = 'Email-urile nu se potrivesc';
      return false;
    } else if (this.user.password !== this.confirmPassword) {
      this.error = 'Parolele nu se potrivesc';
      return false;
    } else if (this.user.password.length < 8) {
      this.error = 'Parola trebuie sa contina cel putin 8 caractere';
      return false;
    } else if (!/[A-Z]/.test(this.user.password) || !/[a-z]/.test(this.user.password) || !/[0-9]/.test(this.user.password)) {
      this.error = 'Parola trebuie sa contina cel putin o litera mare, o litera mica si un numar';
      return false;
    } else {
      this.error = '';
      return true;
    }
  }

  register(): void {
    if (this.validator()) {
      const newUser: User = {
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        status: this.user.status
      };

      this.authservice.register(newUser).subscribe({
        next: response => {
          console.log('Registration successful', response);
          // Optionally, navigate to the login page or another page
          this.error = ''; // Clear error on successful registration
        },
        error: err => {
          this.error = 'Registration failed. Please try again.';
          console.error('Registration error', err);
        }
      });
    }
  }
}
