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
  project: Project = {} as Project;
  projectImage: string | null = null;
  defaultImage = '../../../../assets/defaultImage.jpeg'; // Path to the default image

  constructor(
    private route: ActivatedRoute,
    private service: ProjectsService,
    private router: Router
  ) { }

  id = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.getProject();
    this.getProjectImage(this.id);
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top when navigation ends
      }
    });
  }

  getProject(): void { 
    this.service.getOneProject(this.id).subscribe({
      next: (data => { 
        this.project = data;
      }), 
      error: (error) => console.error(error)
    });
  } 

  getProjectImage(id: number): void {
    this.service.getProjectImage(id).pipe(
      catchError(err => {
        console.error(err);
        return of(null); // Handle error by returning null
      })
    ).subscribe(blob => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.projectImage = reader.result as string;
        };
        reader.readAsDataURL(blob);
      } else {
        this.projectImage = this.defaultImage; // Use default image if the fetch fails
      }
    });
  }  
}