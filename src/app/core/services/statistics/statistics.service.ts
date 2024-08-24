import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countEnvironment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient 
  ) { }

  getStatistics() {
    this.getMessages();
    this.getVolunteers();
    this.getProjects();
    this.getBecomeVolunteers();
    this.getUsers();
  }

  getMessages(): Observable<number> {
    return this.http.get<number>(countEnvironment.getMessages);
  }

  getVolunteers() : Observable<number> {
    return this.http.get<number>(countEnvironment.getVolunteers);
  }
  
  getProjects() : Observable<number> {
    return this.http.get<number>(countEnvironment.getProjects);
  }
  
  getBecomeVolunteers() : Observable<number> {
    return this.http.get<number>(countEnvironment.getBecomeVolunteers);
  }

  getUsers() : Observable<number> {
    return this.http.get<number>(countEnvironment.getUsers);
  }
}