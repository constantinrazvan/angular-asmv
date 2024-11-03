import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { AuthService } from '../auth/auth.service';

export interface ProjectResponse {
  id: number;
  title: string;
  summary: string;
  imageUrl: string | null;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private baseUrl: string = 'http://localhost:5235/api/Projects';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProjects(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(`${this.baseUrl}/all-projects`, {
      headers: this.getAuthHeaders()
    });
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`http://localhost:5235/api/projects/project/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  getProjectImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/project/${id}/image`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  addProject(project: Project, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);
    formData.append('photo', photo);

    return this.http.post(`${this.baseUrl}/new-project`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateProject(id: number, project: Project, photo?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);
    if (photo) formData.append('photo', photo);

    return this.http.put(`${this.baseUrl}/update-project/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-project/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  countProjects(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-projects`, {
      headers: this.getAuthHeaders()
    });
  }
}
