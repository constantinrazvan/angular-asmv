import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private successTitle = new BehaviorSubject<string>('');
  private successMessage = new BehaviorSubject<string>('');
  private errorTitle = new BehaviorSubject<string>('');
  private errorMessage = new BehaviorSubject<string>('');

  successTitle$ = this.successTitle.asObservable();
  successMessage$ = this.successMessage.asObservable();
  errorTitle$ = this.errorTitle.asObservable();
  errorMessage$ = this.errorMessage.asObservable();

  setSuccess(title: string, message: string) {
    this.successTitle.next(title);
    this.successMessage.next(message);
  }

  setError(title: string, message: string) {
    this.errorTitle.next(title);
    this.errorMessage.next(message);
  }
}
