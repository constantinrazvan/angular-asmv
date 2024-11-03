import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/Message';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private readonly baseUrl = 'http://localhost:5235/api/Message';

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  // Public endpoint to add a new message
  addMessage(message: Message): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/new-message`, message);
  }

  // Helper method to get authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getUserToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all messages (requires authentication)
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/all-messages`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get a specific message by ID (requires authentication)
  getOneMessage(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/message/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Mark a message as read (requires authentication)
  markAsRead(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.baseUrl}/markAsRead/${id}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  // Get the count of messages (requires authentication)
  countMessages(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countMessages`, {
      headers: this.getAuthHeaders()
    });
  }
}