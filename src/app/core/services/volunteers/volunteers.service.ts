import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {
  private baseUrl = 'http://localhost:5235/api/volunteers';

  constructor(private http: HttpClient) {}

  // 1. Add a new volunteer
  addVolunteer(volunteer: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/new-volunteer`, volunteer);
  }

  // 2. Get all volunteers
  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.baseUrl}`);
  }

  // 3. Get a single volunteer by ID
  getVolunteer(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${this.baseUrl}/${id}`);
  }

  // 4. Update an existing volunteer by ID
  updateVolunteer(id: number, volunteer: FormData): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/${id}`, volunteer);
  }

  // 5. Delete a volunteer by ID
  removeVolunteer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
