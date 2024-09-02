import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { adminEnvironment, userEnvironment } from '../../environment';

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


  deleteUser(id: number) : Observable<User> {
    return this.http.delete<User>(userEnvironment.deleteOne + id);
  }

  updateUser(id: number, user: User) : Observable<User> {
    return this.http.put<User>(userEnvironment.update + id, user);
  }

  userChangeEmail(id: number, newEmail: string, oldEmail: string): Observable<boolean> {
    return this.http.patch<boolean>(userEnvironment.userChangeEmail + id, {newEmail: newEmail, oldEmail: oldEmail});
  }

  userChangePassword(id: number, newPassword: string, oldPassword: string): Observable<boolean> {
    return this.http.patch<boolean>(userEnvironment.userChangePassword + id, {newPassword: newPassword, oldPassword: oldPassword});
  }

  adminChangePassword(email: string, password: string, accesskey: string): Observable<boolean> {
    return this.http.patch<boolean>(adminEnvironment.changeEmailUser, {email: email, password: password, accessKey: accesskey});
  }
}