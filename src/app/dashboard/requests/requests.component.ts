import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  volunteers = [
    { id: 1, fullname: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', faculty: 'Medicine', reason: 'I want to contribute to the community.', readed: true, joinedDate: '2023-05-12' },
    { id: 2, fullname: 'Jane Smith', email: 'jane.smith@example.com', phone: '9876543210', faculty: 'Pharmacy', reason: 'Volunteering is my passion.', readed: false, joinedDate: '2023-06-20' },
    { id: 3, fullname: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '1122334455', faculty: 'Dentistry', reason: 'I believe in giving back.', readed: true, joinedDate: '2023-04-05' },
    { id: 4, fullname: 'Emily Williams', email: 'emily.williams@example.com', phone: '6677889900', faculty: 'Nursing', reason: 'I want to gain experience.', readed: false, joinedDate: '2023-07-14' },
    { id: 5, fullname: 'Michael Brown', email: 'michael.brown@example.com', phone: '9988776655', faculty: 'Medicine', reason: 'I enjoy helping others.', readed: true, joinedDate: '2023-03-29' }
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