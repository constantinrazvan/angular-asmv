import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecomeVolunteer } from '../../models/BecomeVolunteer';

@Injectable({
  providedIn: 'root'
})
export class BecomevolunteerService {

  constructor(private http: HttpClient) {}

  becomeVolunteerEmpty: BecomeVolunteer = {
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
}
