import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { ProjectService } from '../../core/services/projectService/project.service';
import { Project } from '../../core/interfaces/Project';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [WebNavbarComponent, RouterLink, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectSelected: number = 0;
  projectsList: Project[] = [];
  error: string = '';
  showProject: Project | undefined = {} as Project;
  
  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();   
  }

  loadData(): void {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projectsList = projects;
      }, 
      error: (err) => { 
        console.log(err);
        this.error = err.toString();
      }
    });
  }

  private getProject(): void {
    this.projectsService.getProjectById(this.projectSelected).subscribe(project => {
      this.showProject = project;
    });
  }
}
