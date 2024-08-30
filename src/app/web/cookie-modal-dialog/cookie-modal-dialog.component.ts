import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cookie-modal-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './cookie-modal-dialog.component.html',
  styleUrl: './cookie-modal-dialog.component.css'
})
export class CookieModalDialogComponent {

  constructor(public dialogRef: MatDialogRef<CookieModalDialogComponent>) {}

  onAccept(): void {
    localStorage.setItem('cookiesAccepted', 'true');
    this.dialogRef.close();
  }

  onReject(): void {
    this.dialogRef.close();
  }
}