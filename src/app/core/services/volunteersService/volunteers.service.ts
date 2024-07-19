import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment';
import { Volunteer } from '../../interfaces/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(private http: HttpClient) { }

  addVolunteer(volunteer: Partial<Volunteer>): Observable<Volunteer> {
    return this.http.post<Volunteer>(`${environment.api_base_url}${environment.volunteers_newVolunteer}`, volunteer).pipe(
      catchError(this.handleError<Volunteer>('addVolunteer'))
    );
  }

  becomeVolunteer(firstname: string, lastname: string, email: string, faculty: string, phone: string, reason: string): Observable<any> {
    return this.http.post<Volunteer>(`${environment.api_base_url}${environment.becomeVolunteer_becomeVolunteer}`, 
      {firstname, lastname, email, faculty, phone, reason}, 
      {responseType: 'text' as 'json'});
  }

  getVolunteerData(volunteerId: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(
      `${environment.api_base_url}${environment.volunteers_getById}/${volunteerId}`,
      { responseType: 'json' }
    );
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(
      `${environment.api_base_url}${environment.volunteers_getAll}`,
      { responseType: 'json' }
    );
  }

  updateVolunteer(volunteer: Partial<Volunteer>, volunteerId: number): Observable<Volunteer> {
    const volunteerUpdateUrl = `${environment.api_base_url}${environment.volunteers_updateVolunteer}/${volunteerId}`;
    return this.http.put<Volunteer>(volunteerUpdateUrl, volunteer, { responseType: 'json' });
  }

  deleteVolunteer(id: number): Observable<boolean> {
    const volunteerDeleteUrl = `${environment.api_base_url}${environment.volunteers_deleteVolunteer}/${id}`;
    
    return this.http.delete<void>(volunteerDeleteUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
