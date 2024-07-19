import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Project } from '../../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.api_base_url}${environment.projects_getById}/${id}`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api_base_url}${environment.projects_getAll}`);
  }

  addProject(project: Partial<Project>): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title!);
    formData.append('content', project.content!);
    formData.append('summary', project.summary!);

    if (project.imagePaths) {
      project.imagePaths.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    return this.http.post<Project>(`${environment.api_base_url}${environment.project_newProject}`, formData);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${environment.api_base_url}${environment.project_updateProject}/${id}`, project);
  }

  deleteProject(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api_base_url}${environment.project_deleteProject}/${id}`);
  }
}
