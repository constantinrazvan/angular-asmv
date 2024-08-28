import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../../../core/models/User';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, RouterLink, MatCardModule],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: User = {} as User;
  isEditing: boolean = false;

  constructor(
    private service: UsersService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID');
      return;
    }

    this.service.getOneUser(id).subscribe({
      next: (data) => {
        // Parse the created_at string into a Date object
        const createdAt = data.created_at ? new Date(data.created_at) : null;

        this.user = {
          ...data,
          created_at: createdAt // Replace the string with the Date object
        };

        console.log('User data fetched successfully', this.user);
      },
      error: (e) => {
        console.error('Failed to fetch user data', e);
      }
    });
  }  

  editUser(): void {
    this.isEditing = true;
  }

  deleteUser(): void {
    const confirmed = window.confirm('Sigur dorești să ștergi acest utilizator?');
  
    if (confirmed) {
      this.service.deleteUser(this.user.id!).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/dashboard/utilizatori']);
        },
        error: (e) => {
          console.error('Failed to delete user', e);
        }
      });
    } else {
      console.log('User deletion canceled');
    }
  }
  
  cancelEdit(): void {
    this.getUser(); // Re-fetch user data to reset changes
    this.isEditing = false;
  }

  // Function to format the date as day-mm-yyyy
  formatDate(date: Date | null): string {
    if (!date) return 'N/A';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  checkUserRole(): boolean { 
    const currentUserRole = this.auth.getUserRole();
    const targetUserRole = this.user.role;
  
    // Permite ștergerea dacă utilizatorul curent este "admin"
    // și utilizatorul țintă nu este "admin"
    if (currentUserRole === "admin" && targetUserRole !== "admin") {
      return true;
    }
    
    // Permite ștergerea dacă utilizatorul curent este "Membru Adunarea Generala" 
    // și utilizatorul țintă nu este "Membru Adunarea Generala" și nici "admin"
    if (currentUserRole === "Membru Adunarea Generala" &&
        targetUserRole !== "Membru Adunarea Generala" &&
        targetUserRole !== "admin") {
      return true;
    }
    
    // În toate celelalte cazuri, nu permite ștergerea
    return false;
  }  
}