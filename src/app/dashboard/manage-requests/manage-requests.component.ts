import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';
import { RequestsService } from '../../core/services/requests/requests.service';

@Component({
  selector: 'app-manage-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css'],
})
export class ManageRequestsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fullname', 'email', 'newRequest', 'actiuni'];
  dataSource = new MatTableDataSource<BecomeVolunteer>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: RequestsService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getRequests(): void {
    this.service.getRequests().subscribe({
      next: (data) => {
        this.dataSource.data = data.reverse(); 
        if (this.paginator) {
          this.paginator.firstPage();
        }
      },
      error: (error) => {
        console.error('Error retrieving requests:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.getRequests();
  }
}