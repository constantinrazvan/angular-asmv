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
  users: User[] = [
    { id: 1, firstname: 'Ion', lastname: 'Popescu', email: 'ion.popescu@example.com', password: '123456', role: 'Membru', created_at: new Date('2023-01-15') },
    { id: 2, firstname: 'Maria', lastname: 'Ionescu', email: 'maria.ionescu@example.com', password: '123456', role: 'Membru', created_at: new Date('2023-03-22') },
    // Poți adăuga alți utilizatori aici
  ];
  
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
    return role === "Membru Adunarea Generala" || role === "Membru Consiliu Directorial";
  }

  deleteUser(id: number): void { 
    this.usersService.deleteUser(id).subscribe({
      next: () => { 
        this.users = this.users.filter(user => user.id !== id); // Elimină utilizatorul din listă
      },
      error: (err) => {
        console.error('Eroare la ștergerea utilizatorului:', err);
      }
    });
  }

  getUsers(): void { 
    this.usersService.getAllUsers().subscribe({
      next: (data: User[]) => { 
        console.log(data); 
        this.users.length = 0; 
        this.users.push(...data);
      }, 
      error: (err) => { 
        console.error(err);
      }
    });
  } 
}
