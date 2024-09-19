import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { projectEnvironment } from '../../environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiUrl: string = "http://localhost:5253"; // Adjust if needed

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(projectEnvironment.getAllProjects);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`http://localhost:5235/api/projects/project/${id}`);
  }  

  getProjectImage(projectId: number): Observable<Blob> {
    const url = `${this.apiUrl}/uploaded_images/${projectId}`; // Adjust to your image path
    return this.http.get(url, { responseType: 'blob' });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addProject(project: Project, imageFile?: File): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Project>(projectEnvironment.newProject, formData, {
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

    return this.http.put<Project>(projectEnvironment.updateProject(id), formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(projectEnvironment.deleteProject(id), {
      headers: this.getAuthHeaders()
    });
  }
}