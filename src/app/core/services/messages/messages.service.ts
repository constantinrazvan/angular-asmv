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
  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(messageEnvironment.add, message);
  }

  // Authenticated requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(messageEnvironment.getAll, {
      headers: this.getAuthHeaders()
    });
  }

  getOneMessage(id: number): Observable<Message> {
    return this.http.get<Message>(messageEnvironment.getOne + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(messageEnvironment.update + id, message, {
      headers: this.getAuthHeaders()
    });
  }

  deleteMessage(id: number): Observable<boolean> { 
    return this.http.delete<boolean>(messageEnvironment.delete + id, {
      headers: this.getAuthHeaders()
    });
  }

  markAsRead(id: number): Observable<void> {
    return this.http.patch<void>(`${messageEnvironment.markAsRead}/${id}`, {}, {
      headers: this.getAuthHeaders()
    });
  }
}
