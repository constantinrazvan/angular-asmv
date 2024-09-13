import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecomeVolunteer } from '../../models/BecomeVolunteer';
import { becomeVolunteerEnvironment } from '../../environment';
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
    return this.http.post<BecomeVolunteer>(becomeVolunteerEnvironment.add, becomeVolunteer);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRequests(): Observable<BecomeVolunteer[]> {
    return this.http.get<BecomeVolunteer[]>(becomeVolunteerEnvironment.getAll, {
      headers: this.getAuthHeaders()
    });
  }

  getOne(id: number): Observable<BecomeVolunteer> {
    return this.http.get<BecomeVolunteer>(`${becomeVolunteerEnvironment.getOne}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateRequest(id: number, becomeVolunteer: BecomeVolunteer): Observable<BecomeVolunteer> {
    return this.http.put<BecomeVolunteer>(`${becomeVolunteerEnvironment.update}/${id}`, becomeVolunteer, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRequest(id: number): Observable<BecomeVolunteer> {
    return this.http.delete<BecomeVolunteer>(`${becomeVolunteerEnvironment.delete}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  markAsRead(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${becomeVolunteerEnvironment.markAsRead}${id}`, null, {
      headers: this.getAuthHeaders()
    });
  }
}