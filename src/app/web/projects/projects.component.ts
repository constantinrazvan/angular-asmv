import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project/service.service';
import { Project } from '../../core/models/Project';
import { ProjectApiResponse } from '../../core/models/ProjectApiResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  constructor(
    private service: ProjectService
  ) { }

  projectsList: Project[] = [];

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() : void {
    this.service.getProjects().subscribe({
      next: (data : ProjectApiResponse) => {
        this.projectsList = data.$values;
      },
      error: (error) => {
        console.error('Error fetching projects', error);
      }
    })
  }
}