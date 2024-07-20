import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  requests: BecomeVolunteer[] = [
    { firstname: 'John', lastname: 'Doe', email: 'john@example.com', faculty: 'Science', phone: '1234567890', reason: 'I love volunteering', date: '2023-07-19' },
    { firstname: 'Jane', lastname: 'Smith', email: 'jane@example.com', faculty: 'Arts', phone: '0987654321', reason: 'I want to help', date: '2023-07-18' }
  ];

  selectedRequest: BecomeVolunteer | null = null;

  deleteRequest(index: number): void {
    this.requests.splice(index, 1);
  }

  viewRequest(request: BecomeVolunteer): void {
    this.selectedRequest = request;
  }

  closeDialog(): void {
    this.selectedRequest = null;
  }
}
