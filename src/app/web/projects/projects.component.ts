import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
export class ProjectsComponent implements OnInit, AfterViewInit {
  projectSelected: number = 0;
  projectsList: Project[] = [];
  error: string = '';
  showProject: Project | undefined = {} as Project;

  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();   
  }

  ngAfterViewInit() {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element: any) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  loadData(): void {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projectsList = projects;
        // Trigger onScroll to handle initial elements already in view
        this.onScroll();
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
