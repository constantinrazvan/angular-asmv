import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';
import { volunteerEnvironment } from '../../environment';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

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
    return this.http.get<Volunteer[]>('http://localhost:5235/volunteers', {
      headers: this.getAuthHeaders()
    });
  }

  getOne(id: number): Observable<Volunteer> {
    if (!id || id <= 0) {
      throw new Error('Invalid ID');
    }
  
    return this.http.get<Volunteer>(`http://localhost:5235/volunteer/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  

  addVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(volunteerEnvironment.addVolunteer(), volunteer, {
      headers: this.getAuthHeaders()
    });
  }

  deleteVolunteer(id: number): Observable<boolean> { 
    return this.http.delete<boolean>(`http://localhost:5235/delete-volunteer/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateVolunteer(id: number, volunteer: Volunteer): Observable<Volunteer> {
    return this.http.put<Volunteer>(volunteerEnvironment.updateVolunteer(id), volunteer, {
      headers: this.getAuthHeaders()
    });
  }
}
