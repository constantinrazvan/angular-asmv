import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../core/models/Message'; // Ensure this matches the backend DTO
import { MessagesService } from '../../core/services/messages/messages.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private service: MessagesService) {}

  itemsPerPage = 3;
  currentPage = 1;

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages() {
    this.service.getAllMessages().subscribe({
      next: (data: Message[]) => {
        console.log(data); // Check the structure of the data in the console
        this.messages = data.reverse(); // Directly assign the fetched data
      },
      error: (error: string | null) => {
        console.log('Eroare la aducerea mesajelor!');
        console.log(error);
      }
    });
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

  refresh(): void { 
    this.fetchMessages();
    window.location.reload();
  }

  markAsRead(id: number) { 
    this.service.markAsRead(id).subscribe({
      next: (res) => { 
        console.log("Stare modificată:");
        console.log(JSON.stringify(res, null, 2)); 
        window.location.reload(); 
        
      }, 
      error: (error) => { 
        console.log('Eroare la actualizarea stării mesajului!');
        console.log(error);
      }
    });
  }
}