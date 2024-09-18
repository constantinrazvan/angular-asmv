import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../core/models/Message';
import { MessagesService } from '../../core/services/messages/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages : Message[] = [];

  constructor(
    private service: MessagesService
  ){}

  itemsPerPage = 3; 
  currentPage = 1;

  fetchMessages() {
    this.service.getAllMessages().subscribe({
      next: (data: Message[]) => { 
        for(let i = 0; i < data.length; i++) { 
          this.messages.push(data[i]);
        }
      },
      error: (error: string | null) => { 
        console.log("Eroare la aducerea mesajelor!");
        console.log(error);
      }
    })
  }

  reloadData() { 
    this.service.getAllMessages().subscribe({
      next: (data: Message[]) => { 
        this.messages = []; 
        this.messages.push(...data);
      }
    })
  }

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