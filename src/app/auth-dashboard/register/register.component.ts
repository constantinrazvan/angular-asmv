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
import { HttpErrorResponse } from '@angular/common/http';

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
  accesskey: string = "";

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
    // Verifică dacă toate câmpurile sunt completate corect
    if (this.email !== this.confirmEmail) {
      this.error = "Emailurile nu coincid!";
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.error = "Parolele nu coincid!";
      return;
    }
  
    console.log(`
      User firstname: ${this.firstname}, 
      User lastname: ${this.lastname}, 
      User email: ${this.email}, 
      User password: ${this.password}, 
      User role: ${this.role}, 
      User createdAt: ${this.createdAt}`
    );
  
    this.service.register(this.firstname, this.lastname, this.email, this.password, this.role, this.createdAt, this.accesskey).subscribe({
      next: (isRegistered: boolean) => {
        if (isRegistered) {
          this.router.navigate(['/autentificare']);
        } else {
          this.error = "Email deja existent sau cheia de acces este invalida!";
          console.log('Registration failed: User already exists or invalid access key');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error details:', error.error);
        this.error = "A apărut o eroare la înregistrare!";
      }
    });
  }
}