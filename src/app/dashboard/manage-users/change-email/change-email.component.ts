import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {
  email: string = '';
  confirmEmail: string = '';

  constructor(
    private service: UsersService, 
    private route: ActivatedRoute
  ) {}

  changeEmail(): void {
    if (!this.email || !this.confirmEmail) {
      alert('Please fill in all required fields with valid email addresses.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('User ID is missing');
      return;
    }

    if (this.email === this.confirmEmail) {
      this.service.changeEmail(Number(id), this.email).subscribe({
        next: () => {
          alert('Email updated successfully');
        },
        error: (err) => {
          console.error('Error updating email', err);
          alert('Failed to update email. Please try again.');
        }
      });
    } else {
      alert("Email addresses do not match.");
    }
  }
}