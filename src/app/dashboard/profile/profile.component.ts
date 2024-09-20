import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    role: 'Admin',
    created_at: new Date('2023-03-15')
  };

  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

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