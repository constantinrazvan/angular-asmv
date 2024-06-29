import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment';
import { Volunteer } from '../../interfaces/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(
    private http: HttpClient
  ) { }

  becomeVolunteer(firstname: string, lastname: string, email: string, phone: string, reason: string): Observable<any> {
    return this.http.post<void>(`${environment.api_base_url}${environment.becomevolunteer_endpoint}`, 
      {firstname, lastname, email, phone, reason}, 
      {responseType: 'text' as 'json'});
  }

  getVolunteerData(volunteerId: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(
      `${environment.api_base_url}${environment.volunteer_get_data_endpoint}/${volunteerId}`,
      { responseType: 'json' }
    );
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(
      `${environment.api_base_url}${environment.volunteer_list_endpoint}`,
      { responseType: 'json' }
    );
  }

  updateVolunteer(volunteer: Partial<Volunteer>, volunteerId: number): Observable<Volunteer> {
    const volunteerUpdateUrl = `${environment.api_base_url}${environment.update_volunteer_endpoint}/${volunteerId}`;
    return this.http.put<Volunteer>(volunteerUpdateUrl, volunteer, { responseType: 'json' });
  }

  deleteVolunteer(id: number): Observable<boolean> {
    const volunteerDeleteUrl = `${environment.api_base_url}${environment.delete_volunteer_endpoint}/${id}`;
    
    return this.http.delete<void>(volunteerDeleteUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
