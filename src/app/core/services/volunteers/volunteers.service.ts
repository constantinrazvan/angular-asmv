import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';
import { volunteerEnvironmet } from '../../environment';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  private baseUrl = 'http://localhost:8080/api/volunteers/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Method to get authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(volunteerEnvironmet.getAll, {
      headers: this.getAuthHeaders()
    });
  }

  getOne(id: number): Observable<Volunteer> {
    if (!id) {
      throw new Error('Invalid ID');
    }
    const url = `${this.baseUrl}${id}`;
    return this.http.get<Volunteer>(url, {
      headers: this.getAuthHeaders()
    });
  }

  addVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(volunteerEnvironmet.add, volunteer, {
      headers: this.getAuthHeaders()
    });
  }

  deleteVolunteer(id: number): Observable<boolean> { 
    return this.http.delete<boolean>(volunteerEnvironmet.delete + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateVolunteer(id: number, volunteer: Volunteer): Observable<Volunteer> {
    return this.http.put<Volunteer>(volunteerEnvironmet.update + id, volunteer, {
      headers: this.getAuthHeaders()
    });
  }
}