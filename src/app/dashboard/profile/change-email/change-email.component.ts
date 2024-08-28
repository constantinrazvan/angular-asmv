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

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.css'
})
export class ChangeEmailComponent implements OnInit {
  oldEmail : string = '';
  newEmail : string = '';

  constructor(
    private service: UsersService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  id : number = this.authService.getUserId();

  changeEmail() : void {

    if(this.oldEmail == '' || this.newEmail == '') {
      alert('Toate campurile sunt obligatorii!');
    }

    if(this.oldEmail == this.newEmail && this.id != null) {
      this.service.userChangeEmail(this.id, this.oldEmail, this.newEmail).subscribe({ 
        next: () => {
          alert('Ai schimbat parola cu succes!!');
          this.router.navigate(['/dashboard/profil', this.id]);
        },
        error: () => {
          alert('Parola curenta nu este corecta!');
        }
      });
    }
  }
}