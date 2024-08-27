import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'] // Corrected styleUrls
})
export class ChangePasswordComponent {
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private service: UsersService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  changePassword(): void {
    if (!this.password || !this.confirmPassword) {
      alert('Vă rugăm să completați toate câmpurile necesare.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('ID-ul utilizatorului lipsește.');
      return;
    }

    if (this.password === this.confirmPassword) {
      this.service.changePassword(Number(id), this.password).subscribe({
        next: () => {
          console.log('Parola actualizată cu succes');
          this.router.navigate(['/dashboard/vezi-utilizator', id]);
        },
        error: (err) => {
          console.error('Eroare la actualizarea parolei', err);
          alert('Nu s-a reușit actualizarea parolei. Vă rugăm încercați din nou.');
        }
      });
    } else {
      alert('Parolele nu coincid.');
    }
  }
}
