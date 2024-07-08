import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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

  voluntariData = [
    {id: 1, name: 'John Doe', email: 'john.doe@example.com'},
    {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},
    // Add more data as needed
  ];

  proiecteData = [
    {id: 1, name: 'Proiect A', status: 'Active'},
    {id: 2, name: 'Proiect B', status: 'Completed'},
    // Add more data as needed
  ];

  voluntariDataSource = new MatTableDataSource(this.voluntariData);
  proiecteDataSource = new MatTableDataSource(this.proiecteData);

  @ViewChild('voluntariPaginator') voluntariPaginator!: MatPaginator;
  @ViewChild('voluntariSort') voluntariSort!: MatSort;
  @ViewChild('proiectePaginator') proiectePaginator!: MatPaginator;
  @ViewChild('proiecteSort') proiecteSort!: MatSort;

  ngOnInit() {
    // Initialization logic can go here if needed
  }

  ngAfterViewInit() {
    this.voluntariDataSource.paginator = this.voluntariPaginator;
    this.voluntariDataSource.sort = this.voluntariSort;

    this.proiecteDataSource.paginator = this.proiectePaginator;
    this.proiecteDataSource.sort = this.proiecteSort;
  }
}
