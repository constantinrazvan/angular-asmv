import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Project } from '../../core/models/Project';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, RouterLink, CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  dataSource = new MatTableDataSource<Project>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  isLoading = true;  // Loading state flag
  defaultImage = '../../../assets/defaultImage.jpeg';  // Path to the default image

  constructor(private service: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.service.getAllProjects().pipe(
      switchMap(projects => {
        this.projects = projects;
        return this.fetchImages().pipe(
          tap(() => {
            this.dataSource.data = this.projects;
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
            this.isLoading = false; // Data has been loaded
          })
        );
      }),
      catchError(() => {
        this.isLoading = false; // Ensure spinner stops even if there's an error
        return of([]);
      })
    ).subscribe();
  }

  fetchImages(): Observable<void> {
    const imageRequests = this.projects.map(project =>
      this.service.getProjectImage(project.id).pipe(
        catchError(err => {
          console.error(`Error fetching image for project ${project.id}:`, err);
          return of(null);
        }),
        switchMap(blob => {
          if (blob) {
            const reader = new FileReader();
            return new Observable<void>(observer => {
              reader.onload = () => {
                project.image = reader.result as string;
                observer.next();
                observer.complete();
              };
              reader.readAsDataURL(blob);
            });
          } else {
            project.image = this.defaultImage;  // Use default image if the fetch fails
            return of(null);
          }
        })
      )
    );
    return forkJoin(imageRequests).pipe(
      switchMap(() => of<void>(undefined))
    );
  }
}