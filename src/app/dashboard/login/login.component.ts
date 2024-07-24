import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Login } from '../../core/models/Login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  login: Login = { ...this.service.loginEmpty };

  loginPost() {
    this.service.login(this.login).subscribe({
      next: (res: { token: string }) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['dashboard/mesaje']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
