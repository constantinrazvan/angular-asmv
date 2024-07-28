import { Injectable } from '@angular/core';
import { Message } from '../../models/ContactMessage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RetriveMessage } from '../../models/RetriveMessage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'https://localhost:7155/api/Message';

  constructor(private http: HttpClient) { }

  contactEmpty: Message = {
    FullName: '',
    Email: '',
    Mess: ''
  };

  sendMessage(message: Message): Observable<Message> {
    const payload = {
      fullName: message.FullName,
      email: message.Email,
      message: message.Mess
    };
    console.log('Sending payload:', payload);
    return this.http.post<Message>(`${this.baseUrl}/add`, payload);
  }

  getMessage(id: number): Observable<RetriveMessage> {
    return this.http.get<RetriveMessage>(`${this.baseUrl}/${id}`);
  }

  getAllMessages(): Observable<RetriveMessage[]> {
    return this.http.get<RetriveMessage[]>(`${this.baseUrl}/all`);
  }

  getCount() : Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
