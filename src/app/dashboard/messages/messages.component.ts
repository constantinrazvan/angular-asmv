import { Component } from '@angular/core';
import { Message } from '../../core/models/ContactMessage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages: Message[] = [
    { fullname: 'John Doe', email: 'john@example.com', message: 'Hello, I have a question about your services.', date: '2023-07-19' },
    { fullname: 'Jane Smith', email: 'jane@example.com', message: 'I would like to know more about volunteering opportunities.', date: '2023-07-18' }
  ];

  selectedMessage: Message | null = null;

  deleteMessage(index: number): void {
    this.messages.splice(index, 1);
  }

  viewMessage(message: Message): void {
    this.selectedMessage = message;
  }

  closeDialog(): void {
    this.selectedMessage = null;
  }
}
