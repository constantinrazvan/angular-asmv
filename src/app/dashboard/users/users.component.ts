import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/models/User';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  
  role: string = '';
  hasAccess: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.hasAccess = this.checkUserRole(this.role);
    if (this.hasAccess) {
      this.getUsers(); // Obține utilizatorii doar dacă ai acces
    }
  }

  checkUserRole(role: string): boolean {
    return role === "Membru Adunarea Generala" || role === "Membru Consiliu Directorial" || role === "admin";
  }

  deleteUser(id: number): void { 
    this.usersService.deleteUser(id).subscribe({
      next: () => { 
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (err) => {
        console.error('Eroare la ștergerea utilizatorului:', err);
      }
    });
  }

  getUsers(): void { 
    this.usersService.getAllUsers().subscribe({
      next: (data: any) => { 
        console.log(data); 
        this.users.length = 0; 
        if (data.$values && Array.isArray(data.$values)) {
          this.users.push(...data.$values.map((user: any) => ({
            ...user,
            created_at: user.createdAt ? new Date(user.createdAt) : null // Transformă în Date sau lasă null
          })));
        } else {
          console.error('Răspunsul nu conține un array valid:', data);
        }
      }, 
      error: (err) => { 
        console.error(err);
      }
    });
  }  
}
