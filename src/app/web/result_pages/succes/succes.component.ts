import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-succes',
  standalone: true,
  imports: [],
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
