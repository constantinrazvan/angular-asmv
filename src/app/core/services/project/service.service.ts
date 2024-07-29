import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { ProjectDTO } from '../../models/ProjectDTO';
import { ProjectApiResponse } from '../../models/ProjectApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'https://localhost:7155/api/Projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectApiResponse> {
    return this.http.get<ProjectApiResponse>(`${this.baseUrl}`);
  }

  addProject(project: ProjectDTO, userId: number): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);

    // Ensure `images` is an array of `File` objects
    if (project.images) {
      project.images.forEach(image => {
        if (image instanceof File) {
          formData.append('images', image);
        } else {
          console.warn('Non-File object in images array:', image);
        }
      });
    }

    return this.http.post<Project>(`${this.baseUrl}?userId=${userId}`, formData);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  updateProject(id: number, project: ProjectDTO, userId: number): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);

    // Ensure `images` is an array of `File` objects
    if (project.images) {
      project.images.forEach(image => {
        if (image instanceof File) {
          formData.append('images', image);
        } else {
          console.warn('Non-File object in images array:', image);
        }
      });
    }

    return this.http.put<Project>(`${this.baseUrl}/${id}?userId=${userId}`, formData);
  }
}
