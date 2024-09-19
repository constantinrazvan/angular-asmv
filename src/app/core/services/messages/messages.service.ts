import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageEnvironment } from '../../environment';
import { Message } from '../../models/Message';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient, 
    private authService: AuthService // Inject AuthService
  ) { }

  // Public endpoint to add a new message
  addMessage(message: Message): Observable<boolean> {
    return this.http.post<boolean>(messageEnvironment.addMessage, message);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(messageEnvironment.getAllMessages, {
      headers: this.getAuthHeaders()
    });
  }

  getOneMessage(id: number): Observable<Message> {
    return this.http.get<Message>(messageEnvironment.getMessageById(id), {
      headers: this.getAuthHeaders()
    });
  }

  markAsRead(id: number) : Observable<Message> {
    return this.http.put<Message>(messageEnvironment.markAsRead(id), {
      headers: this.getAuthHeaders()
    })
  }
}