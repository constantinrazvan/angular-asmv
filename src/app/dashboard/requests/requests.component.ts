import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';
import { BecomevolunteerService } from '../../core/services/becomeVolunteer/becomevolunteer.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: BecomeVolunteer[] = [];
  selectedRequest: BecomeVolunteer | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private service: BecomevolunteerService) {}

  refreshData(): void {
    location.reload();
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.service.getAllVolunteers().subscribe({
      next: (data: any) => {
        console.log('Data received from service:', data);
        if (data && Array.isArray(data.$values)) {
          this.requests = this.reverseRequests(data.$values);
        } else {
          console.error('Data is not an array:', data);
          this.requests = [];
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  reverseRequests(data: BecomeVolunteer[]): BecomeVolunteer[] {
    let stack: BecomeVolunteer[] = [];

    for(let request of data) {
      stack.push(request);
    }

    let reversedRequests: BecomeVolunteer[] = [];

    while(stack.length > 0) {
      reversedRequests.push(stack.pop()!);
    }
    return reversedRequests;
  }

  deleteRequest(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.requests.splice(startIndex + index, 1);
  }

  viewRequest(request: BecomeVolunteer): void {
    this.selectedRequest = request;
  }

  closeDialog(): void {
    this.selectedRequest = null;
  }

  get paginatedRequests(): BecomeVolunteer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.requests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.requests.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}