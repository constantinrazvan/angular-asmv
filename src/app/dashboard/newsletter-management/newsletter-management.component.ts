import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-newsletter-management',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatSort, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './newsletter-management.component.html',
  styleUrl: './newsletter-management.component.css'
})
export class NewsletterManagementComponent implements OnInit {
  displayedColumns: string[] = ['email', 'actions'];
  newsletterData = [
    { email: 'john.doe@example.com', citit: 'Nu' },
    { email: 'jane.smith@example.com', citit: 'Da' },
    // Add more data as needed
  ];

  newsletterDataSource = new MatTableDataSource(this.newsletterData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('viewEmailTemplate') viewEmailTemplate!: TemplateRef<any>;

  selectedEmail: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.newsletterDataSource.data = this.newsletterData;
  }

  ngAfterViewInit() {
    this.newsletterDataSource.paginator = this.paginator;
    this.newsletterDataSource.sort = this.sort;
  }

  viewEmail(email: any) {
    this.selectedEmail = email;
    this.dialog.open(this.viewEmailTemplate);
  }

  toggleCititStatus(email: any) {
    const index = this.newsletterData.findIndex(m => m === email);
    if (index >= 0) {
      this.newsletterData[index].citit = this.newsletterData[index].citit === 'Da' ? 'Nu' : 'Da';
      this.newsletterDataSource.data = [...this.newsletterData];
    }
  }
}
