import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, RouterLink],
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'] // Corrected styleUrl to styleUrls
})
export class ChangeEmailComponent implements OnInit {
  oldEmail: string = '';
  newEmail: string = '';

  constructor(
    private service: UsersService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  id: number = this.authService.getUserId();

  changeEmail(): void {
    if (this.oldEmail === '' || this.newEmail === '') {
      this.snackBar.open('Toate câmpurile sunt obligatorii!', 'Închis', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    if (this.oldEmail !== this.newEmail && this.id != null) {
      this.service.userChangeEmail(this.id, this.newEmail, this.oldEmail).subscribe(
        response => {
          this.snackBar.open('Email schimbat cu succes!', 'Închis', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          const email = localStorage.getItem('email');
          localStorage.removeItem('email');
          localStorage.setItem('email', this.newEmail);

          this.router.navigate(['/profile']);
        },
        error => {
          this.snackBar.open('Eroare la schimbarea emailului!', 'Închis', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error changing email:', error);
        }
      );
    }
  }  
}