import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [
    // (Projects array remains unchanged)
  ];

  constructor() {}

  getProjectById(id: number): Observable<Project | undefined> {
    return of(this.projects.find(project => project.id === id));
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
