import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { volunteerEnvironment } from '../../environment';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(
    private http: HttpClient
  ) { }

  addVolunteer(formData: FormData): Observable<Volunteer> {
    return this.http.post<Volunteer>(`${volunteerEnvironment.addVolunteer}`, formData);
  }  

  getAllVolunteers(): Observable<Volunteer[]> { 
    return this.http.get<Volunteer[]>('http://localhost:5235/api/Volunteers');
  }  

  getVolunteer(id: number): Observable<Volunteer> { 
    return this.http.get<Volunteer>(`http://localhost:5235/api/Volunteers/${id}`);
  }  

  updateVolunteer(id: number, volunteer: Volunteer): Observable<Volunteer> {
    return this.http.put<Volunteer>(`${volunteerEnvironment.updateVolunteer}/${id}`, volunteer);
  }

  deleteVolunteer(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5235/api/Volunteers/${id}`);
  }  
}