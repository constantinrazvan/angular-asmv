import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BecomeVolunteer } from '../../models/BecomeVolunteer';

@Injectable({
  providedIn: 'root'
})
export class BecomevolunteerService {

  constructor(private http: HttpClient) {}

  becomeVolunteerEmpty: BecomeVolunteer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    faculty: '',
    phoneNumber: '',
    reason: ''
  };

  addVolunteer(becomeVolunteer: BecomeVolunteer): Observable<BecomeVolunteer> {
    return this.http.post<BecomeVolunteer>('https://localhost:7155/api/BecomeVolunteer', becomeVolunteer);
  }

  getAllVolunteers(): Observable<BecomeVolunteer[]> {
    return this.http.get<BecomeVolunteer[]>('https://localhost:7155/api/BecomeVolunteer');
  }

  getVolunteer(id: number): Observable<BecomeVolunteer> {
    return this.http.get<BecomeVolunteer>('https://localhost:7155/api/BecomeVolunteer/' + id);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`https://localhost:7155/api/BecomeVolunteer/count`);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7155/api/BecomeVolunteer/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    // Displaying error details for debugging
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  
}
