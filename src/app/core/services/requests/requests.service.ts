import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecomeVolunteer } from '../../models/BecomeVolunteer';
import { becomeVolunteersEnvironment } from '../../environment'; // Corrected import
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  // Public endpoint
  addRequest(becomeVolunteer: BecomeVolunteer): Observable<BecomeVolunteer> {
    return this.http.post<BecomeVolunteer>(becomeVolunteersEnvironment.addVolunteerApplication, becomeVolunteer);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRequests(): Observable<BecomeVolunteer[]> {
    return this.http.get<BecomeVolunteer[]>(becomeVolunteersEnvironment.getAllVolunteers, {
      headers: this.getAuthHeaders()
    });
  }

  getOne(id: number): Observable<BecomeVolunteer> {
    return this.http.get<BecomeVolunteer>(becomeVolunteersEnvironment.getOneVolunteer(id), {
      headers: this.getAuthHeaders()
    });
  }

  updateRequest(id: number, becomeVolunteer: BecomeVolunteer): Observable<BecomeVolunteer> {
    return this.http.put<BecomeVolunteer>(becomeVolunteersEnvironment.updateVolunteer(id), becomeVolunteer, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRequest(id: number): Observable<BecomeVolunteer> {
    return this.http.delete<BecomeVolunteer>(becomeVolunteersEnvironment.deleteRequest(id), {
      headers: this.getAuthHeaders()
    });
  }

  markAsRead(id: number): Observable<string> {
    return this.http.patch<string>(becomeVolunteersEnvironment.markAsRead(id), {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'  // Expecting a text response from the server
    });
  }  
}