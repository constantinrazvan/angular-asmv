import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/service.service'; // Adjust the import according to your setup
import { Project } from '../../core/models/Project'; // Adjust the import according to your setup
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'], 
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule, RouterLink],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      (response: any) => {
        // Check the response structure and extract the array
        if (response && response.$values) {
          this.projects = response.$values;
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }
}
