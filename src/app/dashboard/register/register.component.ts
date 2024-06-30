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
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  error: string = '';
  confirmPassword : string = '';
  confirmEmail: string = '';
  user: User = {} as User;

  constructor(
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
      this.user.firstname = '';
      this.user.lastname = '';
      this.user.email = '';
      this.confirmEmail = '';
      this.confirmPassword = '';
      this.user.password = '';
      this.user.role = '';
      this.error = '';
  }

  private validator(): boolean {
    if(this.user.firstname == '' || this.user.lastname == '' || this.user.email == '' || this.confirmEmail == '' || this.user.password == '') {
      this.error = 'Toate campurile trebuie completate';
      return false; 
    } else if (this.user.email != this.confirmEmail) {
      this.error = 'Email-urile nu se potrivesc';
      return false;
    } else if (this.user.password != this.confirmPassword) {
      this.error = 'Parolele nu se potrivesc';
      return false;
    } else if (this.user.password.length < 8) {
      this.error = 'Parola trebuie sa contina cel putin 8 caractere';
      return true;
    } else if (!this.user.password.includes('[A-Z]') || !this.user.password.includes('[a-z]') || !this.user.password.includes('[0-9]')) {
      this.error = 'Parola trebuie sa contina cel putin o litera mare, o litera mica si un numar';
      return false;
    } else {
      this.error = '';
      return true;
    }
  }

  register() : void {
    if(this.validator() == true) {
      let newUser: User = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role
      }
      console.log('New User:', newUser);
      this.authservice.register(newUser);
    }
  }
}
