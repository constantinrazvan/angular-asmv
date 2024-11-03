import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Volunteer } from '../../core/models/Volunteer';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'] // Fixed typo here
})
export class VolunteersComponent implements OnInit {
  volunteers: Volunteer[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  
  constructor(private service: VolunteersService) {}
  
  ngOnInit(): void {
    this.fetchVolunteers();
  }

  fetchVolunteers(): void {
    this.service.getVolunteers().subscribe({
      next: (data: Volunteer[]) => {
        console.log(data); // Verify data structure
        if (data && Array.isArray(data)) {
          this.volunteers = data.reverse(); // Reverse the order of the list
        } else {
          console.log('Data does not contain a list of volunteers');
        }
      },
      error: (error: any) => {
        console.error('Error fetching volunteers!', error);
      }
    });
  }
  
  get totalItems(): number {
    return this.volunteers.length;
  }

  get paginatedVolunteers(): Volunteer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.volunteers.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  refresh(): void {
    this.fetchVolunteers(); // Reloads the volunteer list
  }

  deleteVolunteer(id: number): void {
    if (confirm('Are you sure you want to delete this volunteer?')) {
      this.service.removeVolunteer(id).subscribe({
        next: () => {
          console.log("Volunteer successfully deleted");
          this.fetchVolunteers();
        },
        error: (error: any) => {
          console.error('Error deleting volunteer!', error);
        }
      });
    }
  }
}
