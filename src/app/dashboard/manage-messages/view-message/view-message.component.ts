import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../core/services/messages/messages.service';
import { Message } from '../../../core/models/Message';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications

@Component({
  selector: 'app-view-message',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  message: Message = {} as Message;
  param: number | null = null;

  constructor(
    private service: MessagesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.param = Number(this.route.snapshot.paramMap.get('id'));
    if (this.param) {
      this.getOne(this.param); // Fetch message details
    }
  }

  getOne(id: number): void {
    this.service.getOneMessage(id).subscribe({
      next: (data: Message) => {
        this.message = data;
      },
      error: (error) => {
        console.error('Error fetching message', error);
        this.snackBar.open('Error fetching message details.', 'Close', { duration: 3000 });
      }
    });
  }

  markAsRead(): void {
    if (this.param !== null) {
      this.service.markAsRead(this.param).subscribe({
        next: () => { 
          this.message.newRequest = !this.message.newRequest;
          this.snackBar.open('Message status updated successfully.', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error updating request status', error);
          this.snackBar.open('An error occurred while updating the request status.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Invalid message ID.', 'Close', { duration: 3000 });
    }
  }
}
