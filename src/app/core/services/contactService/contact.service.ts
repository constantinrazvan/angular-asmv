import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Volunteer } from '../../interfaces/Volunteer';
import { environment } from '../../environment';
import { ContactMessage } from '../../interfaces/ContactMessage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(ContactMessage: ContactMessage): Observable<ContactMessage> {
    const url = `${environment.api_base_url}${environment.contact_send_endpoint}`;
    
    const body = {
      fullname: ContactMessage.fullname,
      email: ContactMessage.email,
      message: ContactMessage.message
    };
  
    return this.http.post<ContactMessage>(url, body).pipe(
      map((data: any) => {
        console.log(data);
        return data as ContactMessage;
      }),
      catchError((error: any) => {
        console.log(error);
        return of({} as ContactMessage);
      }));
  }

    getMessge(): Observable<ContactMessage> {
      const url = `${environment.api_base_url}${environment.contact_get_endpoint}`;
      return this.http.get<ContactMessage>(url).pipe(
        map((data: ContactMessage) => {
          console.log(data);
          return data;
        }),
        catchError((error: any) => {
          console.log(error);
          return of({} as ContactMessage);
        })
      );
    }

    getMessageById(): Observable<ContactMessage> {
      const url = `${environment.api_base_url}${environment.contact_get_by_id_endpoint}`;
      return this.http.get<ContactMessage>(url).pipe(
        map((data: any) => {
          console.log(data);
          return data as ContactMessage;
        }),
        catchError((error: any) => {
          console.log(error);
          return of({} as ContactMessage);
        }));
    }
}
