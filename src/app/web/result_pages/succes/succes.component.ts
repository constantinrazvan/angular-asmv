import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notificationService/notification.service';
import { WebNavbarComponent } from '../../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-succes',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent],
  templateUrl: './succes.component.html',
  styleUrl: './succes.component.css'
})
export class SuccesComponent implements OnInit {
  title: string = ''; 
  message: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.successTitle$.subscribe(title => this.title = title);
    this.notificationService.successMessage$.subscribe(message => this.message = message);
  }
}
