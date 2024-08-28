import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Project } from '../../../core/models/Project';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink, 
  ],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: Project = { id: 0, title: '', content: '', summary: '' };
  projectImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.getProject(this.id);
    this.getProjectImage(this.id);
  }

  getProject(id: number): void {
    this.projectsService.getOneProject(id).subscribe({
      next: (data) => this.project = data,
      error: (e) => console.error(e)
    });
  }

  getProjectImage(id: number): void {
    this.projectsService.getProjectImage(id).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    ).subscribe(blob => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.projectImage = reader.result as string;
        };
        reader.readAsDataURL(blob);
      }
    });
  }  
}
