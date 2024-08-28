import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/models/User';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterLink, 
    MatPaginatorModule,
    MatCardModule, 
    MatIconModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  getUsers(): void { 
    this.service.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      }, 
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  refreshData(): void {
    this.getUsers();
  }

  accesGranted(): boolean {
    const userRole: string = localStorage.getItem('role') as string;
    return userRole === "Membru Adunarea Generala" || userRole === "admin";
  }
}