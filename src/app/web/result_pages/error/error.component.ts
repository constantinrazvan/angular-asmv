import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  title: string = ''; 
  message: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.errorTitle$.subscribe(title => this.title = title);
    this.notificationService.errorMessage$.subscribe(message => this.message = message);
  }
}

