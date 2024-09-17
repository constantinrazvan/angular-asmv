import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.css'
})
export class VolunteersComponent {
  roles = [
    "Membru Adunarea Generala", 
    "Membru Consiliu Directorial", 
    "Membru Voluntar"
  ];

  volunteers = [
    { id: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', phone: '1234567890', city: 'Bucharest', status: this.roles[2], joinedDate: '2023-05-12' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', phone: '9876543210', city: 'Cluj', status: this.roles[1], joinedDate: '2023-06-20' },
    { id: 3, firstname: 'Robert', lastname: 'Johnson', email: 'robert.johnson@example.com', phone: '1122334455', city: 'Timisoara', status: this.roles[0], joinedDate: '2023-04-05' },
    { id: 4, firstname: 'Emily', lastname: 'Williams', email: 'emily.williams@example.com', phone: '6677889900', city: 'Iasi', status: this.roles[2], joinedDate: '2023-07-14' },
    { id: 5, firstname: 'Michael', lastname: 'Brown', email: 'michael.brown@example.com', phone: '9988776655', city: 'Constanta', status: this.roles[1], joinedDate: '2023-03-29' }
  ];

  itemsPerPage = 5;
  currentPage = 1;

  get totalItems() {
    return this.volunteers.length;
  }

  get paginatedVolunteers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.volunteers.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}