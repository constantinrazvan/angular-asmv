import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-contact-management',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatSort,  MatPaginator, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './contact-management.component.html',
  styleUrl: './contact-management.component.css'
})
export class ContactManagementComponent  implements OnInit {
    displayedColumns: string[] = ['firstname', 'lastname', 'email', 'message', 'createdAt', 'citit', 'actions'];
    messageData = [
      { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', message: 'Hello, I need help with...', createdAt: '2024-07-08', citit: 'Nu' },
      { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', message: 'I have a question about...', createdAt: '2024-07-09', citit: 'Da' },
      // Add more data as needed
    ];
  
    messageDataSource = new MatTableDataSource(this.messageData);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('viewMessageTemplate') viewMessageTemplate!: TemplateRef<any>;
  
    selectedMessage: any;
  
    constructor(public dialog: MatDialog) { }
  
    ngOnInit() {
      this.messageDataSource.data = this.messageData;
    }
  
    ngAfterViewInit() {
      this.messageDataSource.paginator = this.paginator;
      this.messageDataSource.sort = this.sort;
    }
  
    viewMessage(message: any) {
      this.selectedMessage = message;
      this.dialog.open(this.viewMessageTemplate);
    }
  
    toggleCititStatus(message: any) {
      const index = this.messageData.findIndex(m => m === message);
      if (index >= 0) {
        this.messageData[index].citit = this.messageData[index].citit === 'Da' ? 'Nu' : 'Da';
        this.messageDataSource.data = [...this.messageData];
      }
    }
}
