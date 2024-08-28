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

  getOneProject = (id: number) : Observable<Project> => {
    return this.http.get<Project>(projectEnvironment.getOne + id);
  }

  getProjectImage(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${projectEnvironment.getImage}/${id}/image`, { responseType: 'blob' as 'json' });
  }
  

  getAllProjects = () : Observable<Project[]> => {
    return this.http.get<Project[]>(projectEnvironment.getAll);
  }

  addProject = (project: Project) : Observable<Project> => {
    return this.http.post<Project>(projectEnvironment.add, project);
  }

  updateProject = (project: Project) : Observable<Project> => {
    return this.http.put<Project>(projectEnvironment.update, project);
  }

  deleteProject = (id: number) : Observable<any> => {
    return this.http.delete<any>(projectEnvironment.delete + id);
  }
}
