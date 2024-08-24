import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Message } from '../../core/models/Message';
import { MessagesService } from '../../core/services/messages/messages.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.css'] // Corrected styleUrls
})
export class ManageMessagesComponent implements OnInit {

  messages: Message[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'text'];
  dataSource = new MatTableDataSource<Message>(this.messages);

  constructor(
    private dialog: MatDialog,
    private service: MessagesService,
    private router: Router
  ) {}

  viewMessage(id: number){
    this.router.navigate(['/view-message', id]);
  }

  ngOnInit(): void {
    this.getMessages(); // Call to retrieve messages
  }

  getMessages(): void {
    this.service.getAllMessages().subscribe({
      next: (data) => {
        this.messages = data; // Directly assign data to messages
        this.dataSource.data = this.messages.sort((a, b) => b.id! - a.id!); // Update the dataSource with the new messages
        console.log('Messages retrieved:', this.messages);
      },
      error: (error) => {
        console.error('Error retrieving messages:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    console.log(id);
  }
}