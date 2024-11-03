import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatFormFieldModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /*
    ** Parola actualiazata pe data de 27/09/2024**
    razvanpana30@gmail.com
    Razvan20.
  */

  /*
    admin2024_asmv@asmv.com
    admin
  */

  constructor(
    private service: AuthService, 
    private router: Router
  ) {}

  email: string = "";
  password: string = "";
  error: string = "";

  onSubmit(): void { 
    console.log(`
      this.email: ${this.email}
      this.password: ${this.password}
    `);
    this.service.login(this.email, this.password).subscribe({
      next: (data: string) => {
        console.log(data);
        this.service.setUserToken(data);
        this.router.navigate(['/dashboard/statistici']);
      }, 
      error: (error: string) => {
        console.log(error);
        this.error = "Email sau parola incorecte! Incercati mai tarziu!";
      }
    });
  }
}