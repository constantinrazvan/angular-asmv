import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { projectEnvironment } from '../../environment';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  // Public endpoints
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(projectEnvironment.getAll);
  }

  getOneProject(id: number): Observable<Project> {
    return this.http.get<Project>(projectEnvironment.getOne + id);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProjectImage(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${projectEnvironment.getImage}/${id}/image`, { responseType: 'blob' as 'json' });
  }
  
  addProject(project: Project, imageFile?: File): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (project.image && typeof project.image === 'string') {
      console.warn('Image is a string URL, not sending in form data.');
    }

    return this.http.post<Project>(projectEnvironment.add, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateProject(id: number, project: Project, imageFile: File | null): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('Updating project with FormData:', formData);

    return this.http.put<Project>(`${projectEnvironment.update}${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(projectEnvironment.delete + id, {
      headers: this.getAuthHeaders()
    });
  }
}