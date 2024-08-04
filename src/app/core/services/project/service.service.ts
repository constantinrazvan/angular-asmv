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

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  // Parametrul `formData` este corect acum și nu trebuie să-l declari din nou
  addProject(formData: FormData, userId: number): Observable<Project> {
    // Nu trebuie să mai creezi un alt `formData` aici
    // Folosește parametrul `formData` care a fost trecut în apel

    return this.http.post<Project>(`${this.baseUrl}?userId=${userId}`, formData);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  updateProject(id: number, formData: FormData, userId: number): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}?userId=${userId}`, formData);
  }
}
