import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService, ProjectResponse } from '../../core/services/projects/projects.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

interface Project {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  content: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, RouterLink, CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [].reverse();
  dataSource = new MatTableDataSource<Project>([]);
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.service.getAllProjects().subscribe({
      next: (response: ProjectResponse[]) => {
        this.projects = response.map((item: ProjectResponse) => ({
          id: item.id,
          title: item.title,
          summary: item.summary,
          imageUrl: item.imageUrl 
            ? `http://localhost:5235${item.imageUrl}` 
            : '../../../../assets/defaultImage.jpeg', 
          content: item.content
        })).reverse();
  
        this.dataSource.data = this.projects;
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
  
}