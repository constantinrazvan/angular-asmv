import { Component } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword : string = "";
  newPassword : string = "";

  constructor(
    private service: UsersService, 
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  id: number = +this.route.snapshot.params['id'];

  changePassword() : void { 
    this.service.userChangePassword(this.id, this.newPassword, this.oldPassword).subscribe({
      next: () => {
        this.snackBar.open('Parola actualizată cu succes', 'Închis', {
          duration: 3000, 
          panelClass: ['success-snackbar'] 
        });
        this.router.navigate(['/dashboard/profil']);
      },
      error: (err) => {
        this.snackBar.open('Eroare la actualizarea parolei. Verificați informațiile furnizate.', 'Închis', {
          duration: 3000, // Durata de afișare în milisecunde
          panelClass: ['error-snackbar'] 
        });
        console.log(err);
      }
    });
  }
}