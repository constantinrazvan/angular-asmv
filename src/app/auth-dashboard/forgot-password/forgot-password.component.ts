import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email : string = "";
  password: string = ""; 
  confirmPassword: string = "";
  accessKey: string = "";

  constructor(
    private router: Router,
    private service: UsersService,
  ) {}

  validations() : string {
    if(this.password != this.confirmPassword) {
      return "Parolele nu se potrivesc";
    }
    
    if(!this.email.includes("@")) {
      return "Email invalid";
    }

    if(this.accessKey == "") {
      return "Cheia de acces este obligatorie";
    }

    return "";
  }

  patchRequest() : void  { 
    if(this.validations() == "") {
        console.log(this.email, this.accessKey, this.password);
        this.service.adminChangePassword(this.email, this.password, this.accessKey).subscribe({
            next: (data : boolean) => {
                console.log(data);
                if (data) {
                    this.router.navigate(['/autentificare']);
                } else {
                    console.error("Password change failed");
                }
            },
            error: (e) => console.error(e),
      });
    }
  }
}