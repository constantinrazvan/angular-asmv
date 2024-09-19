import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../../core/models/Message';
import { MessagesService } from '../../../core/services/messages/messages.service';

@Component({
  selector: 'app-view-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.css'
})
export class ViewMessageComponent implements OnInit {
  message: Message | undefined;

  constructor(private service: MessagesService) {}

  ngOnInit(): void {
    this.fetchMessage();
  }

  fetchMessage() {
    const messageId = 1; 
    this.service.getOneMessage(messageId).subscribe({
      next: (data: Message) => {
        this.message = data;
      },
      error: (err) => {
        console.error('Eroare la încărcarea mesajului:', err);
      }
    });
  }

  toggleReadStatus() {
    if (this.message) {
      this.message.newRequest = !this.message.newRequest;
      this.service.markAsRead(this.message.id!).subscribe({
        next: () => {
          console.log('Mesajul a fost actualizat cu succes.');
        },
        error: (err) => {
          console.error('Eroare la actualizarea mesajului:', err);
        }
      });
    }
  }
}
