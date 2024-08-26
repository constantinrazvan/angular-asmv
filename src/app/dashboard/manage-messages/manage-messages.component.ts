import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Message } from '../../core/models/Message';
import { MessagesService } from '../../core/services/messages/messages.service';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.css']
})
export class ManageMessagesComponent implements OnInit, AfterViewInit {
  messages: Message[] = [];
  displayedColumns: string[] = ['name', 'email', 'text'];
  dataSource = new MatTableDataSource<Message>(this.messages);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private dialog: MatDialog,
    private service: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  ngAfterViewInit() {
    // Initialize paginator after the view has been initialized
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getMessages(): void {
    this.service.getAllMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.dataSource.data = this.messages;
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
    if (this.paginator) {
      this.paginator.firstPage(); // Optionally reset to the first page on filter change
    }
  }

  viewMessage(id: number) {
    this.router.navigate(['/dashboard/vezi-mesaj', id]);
  }

  refreshData() {
    this.getMessages();
  }
}