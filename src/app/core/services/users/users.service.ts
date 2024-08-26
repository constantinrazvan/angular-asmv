import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { userEnvironment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(userEnvironment.getAll);
  }

  getOneUser(id: number) : Observable<User> {
    return this.http.get<User>(userEnvironment.getOne + id);
  }  

  
}
