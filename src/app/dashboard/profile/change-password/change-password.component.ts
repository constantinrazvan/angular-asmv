import { Component } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

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
    private router: Router
  ) {}

  id: number = +this.route.snapshot.params['id'];

  changePassword() : void { 
    this.service.userChangePassword(this.id, this.newPassword, this.oldPassword).subscribe({
      next: () => {
        console.log('Parola actualizată cu succes');
        this.router.navigate(['/dashboard/vezi-utilizator', this.route.snapshot.params['id']]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}