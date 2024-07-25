import { Component, OnInit } from '@angular/core';
import { RetriveMessage } from '../../core/models/RetriveMessage';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact/contact.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: RetriveMessage[] = [];  // Initialize as an empty array
  selectedMessage: RetriveMessage | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private service: ContactService) {}

  refreshData(): void {
    location.reload();
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.service.getAllMessages().subscribe({
      next: (data: any) => {  // Use 'any' type to handle non-standard response structure
        console.log('API response:', data);  // Log the response
        if (data && Array.isArray(data.$values)) {
          this.messages = data.$values;
        } else {
          console.error('Data is not an array:', data);
        }
      },
      error: (error: any | string) => {
        console.log('Error:', error);
      }
    });
  }

  viewMessage(message: RetriveMessage): void {
    this.selectedMessage = message;
  }

  closeDialog(): void {
    this.selectedMessage = null;
  }

  get paginatedMessages(): RetriveMessage[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.messages.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.messages.length / this.itemsPerPage);
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
