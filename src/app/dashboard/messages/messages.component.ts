import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages = [
    { fullname: 'John Doe', email: 'johndoe@example.com', text: 'This is the first message.' },
    { fullname: 'Jane Smith', email: 'janesmith@example.com', text: 'Here is a message from Jane.' },
    { fullname: 'Alice Johnson', email: 'alice.j@example.com', text: 'Alice has left a message here.' },
    { fullname: 'Bob Williams', email: 'bob.w@example.com', text: 'Message from Bob.' },
    { fullname: 'Charlie Brown', email: 'charlieb@example.com', text: 'Charlie Brown says hi.' },
    { fullname: 'Dana White', email: 'dana.white@example.com', text: 'Dana sent this message.' }
  ];

  itemsPerPage = 3; // Changed for easier testing
  currentPage = 1;

  get totalItems() {
    return this.messages.length;
  }

  get paginatedMessages() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.messages.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}