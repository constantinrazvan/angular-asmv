import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Project } from '../../../core/models/Project';
import { WebNavbarComponent } from '../../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../../shared/web-footer/web-footer.component';
import { ActivatedRoute, RouterLink, Router, NavigationEnd } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  project: Project = {} as Project; // Initialize with empty Project
  projectImage: string | null = null; // Keep as string | null
  defaultImage = '../../../../assets/defaultImage.jpeg'; // Path to the default image
  errorMessage: string | null = null; // To store error messages

  constructor(
    private route: ActivatedRoute,
    private service: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Accessing the id parameter from the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getProject(+id);
      }
    });
  }

  ngAfterViewInit() {
    // Scroll to top on navigation end
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  // Method to get the project by id
  // Method to get the project by id
  getProject(id: number): void {
    this.service.getProject(id).pipe(
      catchError(error => {
        console.error(error);
        this.errorMessage = 'Failed to load project. Please try again later.'; // User-friendly error message
        return of(null); // Return null or a fallback value
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.project = data;

          // Set project image from the URL
          this.projectImage = data.imageUrl as string || this.defaultImage; // Ensure it's treated as a string
        } else {
          this.errorMessage = 'Project not found.'; // Handle non-existing project
        }
      }
    });
  }
}