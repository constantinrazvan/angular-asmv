import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { ContactMessage } from '../../core/interfaces/ContactMessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contactService/contact.service';
import { Route, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notificationService/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  data: ContactMessage = {} as ContactMessage;

  constructor(
    private contactService: ContactService, 
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data = {
      fullname: '',
      email: '',
      message: ''
    };
  }

  onSubmit(): void {
    this.contactService.sendMessage(this.data).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.setSuccess('Success', 'Your message has been sent successfully.');
        this.router.navigate(['/success']);
      }, 
      error: (err) => {
        console.error(err);
        this.notificationService.setError('Error', 'There was a problem sending your message.');
        this.router.navigate(['/error']);
      }
    });
    this.data = {} as ContactMessage;
  }
}
