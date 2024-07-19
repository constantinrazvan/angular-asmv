import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-controlpanel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  displayedColumnsProiecte: string[] = ['id', 'name', 'status'];

  voluntariDataSource = new MatTableDataSource<any>([]);
  proiecteDataSource = new MatTableDataSource<any>([]);

  totalVolunteers = 0;
  totalProjects = 0;
  totalVolunteerRequests = 0;

  @ViewChild('voluntariPaginator') voluntariPaginator!: MatPaginator;
  @ViewChild('voluntariSort') voluntariSort!: MatSort;
  @ViewChild('proiectePaginator') proiectePaginator!: MatPaginator;
  @ViewChild('proiecteSort') proiecteSort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStatistics();
  }

  ngAfterViewInit() {
    this.voluntariDataSource.paginator = this.voluntariPaginator;
    this.voluntariDataSource.sort = this.voluntariSort;
    this.proiecteDataSource.paginator = this.proiectePaginator;
    this.proiecteDataSource.sort = this.proiecteSort;
  }

  fetchStatistics() {
    this.http.get<any>('http://localhost:7133/api/statistics/overview').subscribe(data => {
      this.totalVolunteers = data.TotalVolunteers;
      this.totalProjects = data.TotalProjects;
      this.totalVolunteerRequests = data.TotalVolunteerRequests;
      this.voluntariDataSource.data = data.Volunteers;
      this.proiecteDataSource.data = data.Projects;
    });
  }
}
