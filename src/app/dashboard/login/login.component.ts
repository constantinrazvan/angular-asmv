import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth.service';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  email: string = ''; 
  password: string = '';

  constructor(
    private authservice: AuthService
  ) {}

  login() : void {
    if(this.email != '' && this.password != '') {
      let user: Partial<User> = {
        email: this.email,
        password: this.password
      }

      this.authservice.login(user);
    }
  }

}
