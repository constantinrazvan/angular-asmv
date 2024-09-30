import { Component, OnInit } from '@angular/core';
import { User } from '../../profile/profile.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UsersService } from '../../../core/services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user: User = {} as User;

  id: number = 0;
  isEdit: boolean = false;

  getUserId(): void {
      this.id = this.route.snapshot.params["id"];
  }

  constructor(
      private service: AuthService, 
      private userService: UsersService, 
      private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
      this.getUserId();
      this.getUserProfile();
  }

  createdAt: string = '';

  getUserProfile(): void { 
      this.userService.getOneUser(this.id).subscribe({
          next: (res: User) => {
              this.user = res;  // Directly assign the fetched user
              console.log(`User details fetched: { Id: ${res.id}, First Name: ${res.firstname}, Last Name: ${res.lastname}, Email: ${res.email}, Role: ${res.role} }`);

              // Handle date formatting as before
          }, 
          error: (err: string) => { 
              console.log(err);
              alert("Utilizatorul nu exista sau ceva nu a mers cum trebuie! Incearca mai tarziu te rog!");
          }
      });
  }  

  onSubmit(): void { 
      console.log("Submit button pressed");
      // Add your update logic here
  }

  toggleEdit(): void {
      this.isEdit = !this.isEdit; // Toggle the edit mode
  }

  cancelEdit(): void {
      this.isEdit = false; // Exit edit mode without saving changes
      this.getUserProfile(); // Optionally refresh user data
  }

  updateUser(event: Event): void { 
      console.log("update");
  }
}
