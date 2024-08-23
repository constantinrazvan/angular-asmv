import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatFormFieldModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  roles = [
    "Membru Adunarea Generala", 
    "Membru Consiliu Directorial", 
    "Membru Voluntar"
  ];

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  confirmEmail: string = "";
  confirmPassword: string = "";
  role: string = this.roles[2];
  createdAt: string;

  error: string = "";

  constructor(
    private service: AuthService,
    private router: Router
  ) {
    const now: Date = new Date();
    this.createdAt = this.formatDate(now);
  }

  private formatDate(date: Date): string {
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const year: string = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  onSubmit(): void { 
    console.log(this.firstname, this.lastname, this.email, this.password, this.confirmEmail, this.confirmPassword, this.role, this.createdAt);
    this.service.register(this.firstname, this.lastname, this.email, this.password, this.role, this.createdAt).subscribe({
      next: (data: any) => {
        if (data) {
          console.log(data);
          this.router.navigate(['/autentificare']);
        }
      },
      error: (error: string | any) => {
        this.error = "Email deja existent!";
        console.log(error);
      }
    });
  }
}
