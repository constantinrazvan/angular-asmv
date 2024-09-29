import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  created_at: Date | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User = {
    firstname: localStorage.getItem('firstname')!,
    lastname: localStorage.getItem('lastname')!,
    email: localStorage.getItem('email')!,
    password: '',
    role: localStorage.getItem('role')!,
    created_at: new Date(localStorage.getItem('joined_date')!)
  };

  isDarkMode = false;
  isEditMode = false;

  createdAt: string = this.service.getUserJoinedDate();

  constructor(private renderer: Renderer2, private service: AuthService) {}

  get formattedDate() {
    return this.user.created_at ? this.user.created_at.toLocaleDateString() : 'N/A';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}