import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {jwtDecode} from 'jwt-decode';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  selector: 'app-volunteer-requests',
  templateUrl: './volunteer-requests.component.html',
  styleUrls: ['./volunteer-requests.component.css']
})
export class VolunteerRequestsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'createdAt', 'citit', 'actions'];
  volunteerData = [
    { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', faculty: 'Engineering', phone: '1234567890', reason_for_volunteering: 'Helping community', createdAt: '2024-07-08', citit: 'necitit' },
    { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', faculty: 'Arts', phone: '0987654321', reason_for_volunteering: 'Gaining experience', createdAt: '2024-07-09', citit: 'necitit' },
    // Add more data as needed
  ];

  volunteerDataSource = new MatTableDataSource(this.volunteerData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog!: TemplateRef<any>;

  volunteer = { firstname: '', lastname: '', email: '', faculty: '', phone: '', reason_for_volunteering: '', createdAt: '', citit: 'necitit' };
  isEditMode = false;
  editedIndex!: number;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.volunteerDataSource.data = this.volunteerData;
  }

  ngAfterViewInit() {
    this.volunteerDataSource.paginator = this.paginator;
    this.volunteerDataSource.sort = this.sort;
  }

  editVolunteer(volunteer: any) {
    this.isEditMode = true;
    this.volunteer = { ...volunteer };
    this.editedIndex = this.volunteerData.findIndex(v => v === volunteer);
    this.dialog.open(this.dialogTemplate);
  }

  saveVolunteer() {
    if (this.isEditMode) {
      this.volunteerData[this.editedIndex] = this.volunteer;
    } else {
      this.volunteerData.push(this.volunteer);
    }
    this.volunteerDataSource.data = [...this.volunteerData];
    this.dialog.closeAll();
  }

  toggleCititStatus(volunteer: any) {
    const index = this.volunteerData.findIndex(v => v === volunteer);
    if (index >= 0) {
      this.volunteerData[index].citit = this.volunteerData[index].citit === 'citit' ? 'necitit' : 'citit';
      this.volunteerDataSource.data = [...this.volunteerData];
    }
  }

  getUser(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user: any = jwtDecode(token);
        return user.username;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }
}
