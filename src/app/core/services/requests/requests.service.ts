import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BecomeVolunteer } from '../../models/BecomeVolunteer';
import { becomeVolunteerEnvironment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient
  ) { }

  getRequests() : Observable<BecomeVolunteer[]> {
    return this.http.get<BecomeVolunteer[]>(becomeVolunteerEnvironment.getAll);
  }

  getOne(id: number) : Observable<BecomeVolunteer> {
    return this.http.get<BecomeVolunteer>(`${becomeVolunteerEnvironment.getOne}${id}`);
  }

  addRequest(becomeVolunteer: BecomeVolunteer) : Observable<BecomeVolunteer> {
    return this.http.post<BecomeVolunteer>(becomeVolunteerEnvironment.add, becomeVolunteer);
  }

  updateRequest(id:number, becomeVolunteer: BecomeVolunteer) : Observable<BecomeVolunteer> {
    return this.http.put<BecomeVolunteer>(`${becomeVolunteerEnvironment.update}/${id}`, becomeVolunteer);
  }

  deleteRequest(id:number) : Observable<BecomeVolunteer> {
    return this.http.delete<BecomeVolunteer>(`${becomeVolunteerEnvironment.delete}/${id}`);
  }

  markAsRead(id:number) : Observable<boolean> {
    return this.http.patch<boolean>(`${becomeVolunteerEnvironment.markAsRead}${id}`, null);
  }

}
