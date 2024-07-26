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

  messages: RetriveMessage[] = [];  
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
      next: (data: any) => {  
        console.log('API response:', data); 
        if (data && Array.isArray(data.$values)) {
          this.messages = this.reversedMessages(data.$values);
        } else {
          console.error('Data is not an array:', data);
        }
      },
      error: (error: any | string) => {
        console.log('Error:', error);
      }
    });
  }

  reversedMessages(data: RetriveMessage[]): RetriveMessage[] {
    let stack: RetriveMessage[] = [];

    for (let message of data) {
      stack.push(message);
    }

    let reversedMessages: RetriveMessage[] = [];

    while(stack.length > 0) {
      reversedMessages.push(stack.pop()!);
    }

    return reversedMessages;
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