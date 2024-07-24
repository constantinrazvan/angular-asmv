import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Register } from '../../core/models/Register';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  register: Register = { ...this.service.registerEmpty };

  registerPost() {
    this.service.register(this.register).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
