import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../core/models/Project';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-projects',
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
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  dataSource = new MatTableDataSource<Project>(this.projects);
  displayedColumns: string[] = ['title', 'content', 'summary', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getProjects(): void {
    this.service.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.dataSource.data = this.projects;
      },
      error: (e) => console.error(e)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  refreshData() {
    this.getProjects();
  }
}
