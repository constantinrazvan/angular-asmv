import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../../models/Volunteer';
import { volunteerEnvironmet } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() : Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(volunteerEnvironmet.getAll);
  }

  private baseUrl = 'http://localhost:8080/api/volunteers/';

  getOne(id: number): Observable<Volunteer> {
    if (!id) {
      throw new Error('Invalid ID');
    }
    const url = `${this.baseUrl}${id}`;
    return this.http.get<Volunteer>(url);
  }

  addVolunteer(volunteer: Volunteer) : Observable<Volunteer> {
    return this.http.post<Volunteer>(volunteerEnvironmet.add, volunteer);
  }
}
