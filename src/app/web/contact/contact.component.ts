import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../core/models/ContactMessage';
import { ContactService } from '../../core/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message: Message = { ...this.service.contactEmpty };

  title = "ASMV - Contact";

  error: string = "";
  constructor(
    private router: Router,
    private service: ContactService
  ) {}

  ngOnInit(): void {}

  postMessage() {
    console.log('Posting message:', this.message); // Log the message data
    this.service.sendMessage(this.message).subscribe({
      next: (data: Message) => {
        console.log('Response:', data);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log('Error:', error); // Log the error
        this.error = error.message || 'An error occurred';
      }
    });
  }
}
