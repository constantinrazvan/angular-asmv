import { Injectable } from '@angular/core';
import { Message } from '../../models/ContactMessage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetriveMessage } from '../../models/RetriveMessage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactEmpty: Message = {
    FullName: '',
    Email: '',
    Mess: ''
  };

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<Message> {
    const payload = {
      fullName: message.FullName,
      email: message.Email,
      message: message.Mess
    };
    console.log('Sending payload:', payload);
    return this.http.post<Message>('https://localhost:7155/api/Message/add', payload);
  }

  getMessage(id: number): Observable<RetriveMessage> {
    return this.http.get<RetriveMessage>('https://localhost:7155/api/Message/' + id);
  }

  getAllMessages(): Observable<RetriveMessage[]> {
    return this.http.get<RetriveMessage[]>('https://localhost:7155/api/Message/all');
  }
}
