import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { messageEnvironment } from '../../environment';
import { Message } from '../../models/Message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient, 
  ) { }

  getAllMessages = () : Observable<Message[]> => {
    return this.http.get<any>(messageEnvironment.getAll);
  }

  getOneMessage = (id: number) : Observable<Message> => {
    return this.http.get<Message>(messageEnvironment.getOne + id);
  }

  addMessage = (message: Message) : Observable<Message> => {
    return this.http.post<Message>(messageEnvironment.add, message);
  }

  updateMessage = (id: number, message: Message) : Observable<Message> => {
    return this.http.put<Message>(messageEnvironment.update, message);
  }

  deleteMessage = (id: number) : Observable<boolean> => { 
    return this.http.delete<boolean>(messageEnvironment.delete + id);
  }
}
