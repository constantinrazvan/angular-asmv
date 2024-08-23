import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Message } from '../../core/models/Message';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog.component';
import { MessagesService } from '../../core/services/messages/messages.service';

@Component({
  selector: 'app-manage-messages',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './manage-messages.component.html',
  styleUrl: './manage-messages.component.css'
})
export class ManageMessagesComponent implements OnInit {

  messages: Message[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'text'];
  dataSource = new MatTableDataSource<Message>(this.messages);

  constructor(
    private dialog: MatDialog,
    private service: MessagesService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.messages; 
  }

  getMessages() : void {
    this.service.getAllMessages().subscribe({
      next: (data) => {
        console.log(data);
        for(let i = 0; i < data.length; i++) {
          this.messages.push(data[i]);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    console.log(id);
  }

  deleteMessage(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteMessage(id).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          }
        })
        console.log(this.service);
      } else { 
        console.log("Canceled");
      }
    });
  }
}
