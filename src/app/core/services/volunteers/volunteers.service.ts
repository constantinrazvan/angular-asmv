import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private apiUrl = 'https://localhost:7155/api/Volunteer';

  constructor(private http: HttpClient) { }

  getAllVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.apiUrl);
  }

  getVolunteer(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${this.apiUrl}/${id}`);
  }

  addVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.apiUrl, volunteer);
  }

  updateVolunteer(id: number, volunteer: Volunteer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, volunteer);
  }

  deleteVolunteer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
