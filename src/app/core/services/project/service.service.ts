import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { ProjectDTO } from '../../models/ProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'https://localhost:7155/api/Projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<{ $values: Project[] }> {
    return this.http.get<{ $values: Project[] }>(this.baseUrl);
  }

  addProject(project: ProjectDTO, userId: number): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}?userId=${userId}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCount() : Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
