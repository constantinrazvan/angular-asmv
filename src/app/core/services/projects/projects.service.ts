import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/Project';
import { HttpClient } from '@angular/common/http';
import { projectEnvironment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient
  ) { }

  getOneProject = (id: number): Observable<Project> => {
    return this.http.get<Project>(projectEnvironment.getOne + id);
  }

  getProjectImage(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${projectEnvironment.getImage}/${id}/image`, { responseType: 'blob' as 'json' });
  }
  
  getAllProjects = (): Observable<Project[]> => {
    return this.http.get<Project[]>(projectEnvironment.getAll);
  }
  
  addProject = (project: Project, imageFile?: File): Observable<Project> => {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (project.image && typeof project.image === 'string') {
      console.warn('Image is a string URL, not sending in form data.');
    }

    return this.http.post<Project>(projectEnvironment.add, formData);
  }

  updateProject(id: number, project: Project, imageFile: File | null): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('summary', project.summary);
    
    // Include the image only if imageFile is not null
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    // Log the formData to verify its contents
    console.log('Updating project with FormData:', formData);
  
    // Send the FormData to the backend
    return this.http.put<Project>(`${projectEnvironment.update}${id}`, formData);
  }

  deleteProject = (id: number): Observable<any> => {
    return this.http.delete<any>(projectEnvironment.delete + id);
  }
}
