import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countEnvironment } from '../../environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  // Method to get all statistics
  getStatistics() {
    // Fetch all statistics concurrently
    return Promise.all([
      this.getMessages().toPromise(),
      this.getVolunteers().toPromise(),
      this.getProjects().toPromise(),
      this.getBecomeVolunteers().toPromise(),
      this.getUsers().toPromise()
    ]);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMessages(): Observable<number> {
    return this.http.get<number>(countEnvironment.getMessages, {
      headers: this.getAuthHeaders()
    });
  }

  getVolunteers(): Observable<number> {
    return this.http.get<number>(countEnvironment.getVolunteers, {
      headers: this.getAuthHeaders()
    });
  }
  
  getProjects(): Observable<number> {
    return this.http.get<number>(countEnvironment.getProjects, {
      headers: this.getAuthHeaders()
    });
  }
  
  getBecomeVolunteers(): Observable<number> {
    return this.http.get<number>(countEnvironment.getBecomeVolunteers, {
      headers: this.getAuthHeaders()
    });
  }

  getUsers(): Observable<number> {
    return this.http.get<number>(countEnvironment.getUsers, {
      headers: this.getAuthHeaders()
    });
  }
}