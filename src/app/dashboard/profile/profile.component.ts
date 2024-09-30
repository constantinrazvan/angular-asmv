import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { UsersService } from '../../core/services/users/users.service';

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
export class ProfileComponent implements OnInit{

  user: User = {} as User;

  id: number = Number(localStorage.getItem('userId'));

  isDarkMode = false;
  isEditMode = false;

  createdAt: string = this.service.getUserJoinedDate();

  constructor(
    private renderer: Renderer2, 
    private service: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void { 
    this.service.getProfile(this.id).subscribe({
      next: (res: User) => {
        console.log("User details fetched: {");
        console.log(`First Name: ${res.firstname}`);
        console.log(`Last Name: ${res.lastname}`);
        console.log(`Email: ${res.email}`);
        console.log(`Role: ${res.role}`);
        
        // Assigning values to the user object
        this.user.firstname = res.firstname;
        this.user.lastname = res.lastname; 
        this.user.email = res.email; 
        this.user.role = res.role;
        this.user.password = res.password;
        // Formatting the creation date
        if (res.created_at) {
          const joinedDate = new Date(res.created_at);
          const formattedDate = `${joinedDate.getDate().toString().padStart(2, '0')}/${(joinedDate.getMonth() + 1).toString().padStart(2, '0')}/${joinedDate.getFullYear()}`;
          console.log('User joined on:', formattedDate);
  
          // Assigning the formatted date to the `createdAt` property
          this.createdAt = formattedDate;
        } else {
          console.log('User creation date is null or undefined');
        }
  
        console.log("}");
      }, 
      error: (error: string | null) => {
        console.log("An error occurred while fetching the user profile:", error);
        alert("Ceva nu a mers cum trebuie! Incercati mai tarziu!");
      }
    });
  }  
  
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  updateUser(event: Event): void { 
    console.log(this.user);
    event.preventDefault();  // Previi reîncărcarea paginii
    this.userService.updateUser(this.id, this.user).subscribe({
      next: (response) => {
          console.log('Update successful', response);
          this.isEditMode = false;
      },
      error: (error) => {
          console.error('Error updating user', error);
      }}
    );
  }

  newPassword: string = "";
  oldPassword: string = "";

  updatePassword(event: Event): void { 
    this.userService.userChangePassword(this.id, this.newPassword, this.oldPassword).subscribe({
      next: () => { 
        this.service.logout();
      }, 
      error: (err) => { 
        console.log(err); 
        alert("Ceva nu a mers corect! Incercati mai tarziu!");
      }
    });
  }
  
}