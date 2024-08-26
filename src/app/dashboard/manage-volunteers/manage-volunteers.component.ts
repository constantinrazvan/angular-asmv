import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Volunteer } from '../../core/models/Volunteer';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';

@Component({
  selector: 'app-manage-volunteers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './manage-volunteers.component.html',
  styleUrls: ['./manage-volunteers.component.css'] // Fixed typo here
})
export class ManageVolunteersComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'email', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<Volunteer>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: VolunteersService) {}

  ngOnInit(): void {
    this.getVolunteers();
  }

  getVolunteers(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => console.error(e),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  refreshData(): void {
    this.getVolunteers(); // Reload the data
  }
}
