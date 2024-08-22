import { Component } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { RouterLink } from '@angular/router';
import { Project } from '../../core/models/Project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, RouterLink, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  constructor() { }

  projects: Project[] =  []

  getProjects () : Project[] {
    return this.projects
  }

}
