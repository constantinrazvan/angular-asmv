import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Confirmare</h1>
    <div mat-dialog-content>
      <p>Esti sigur ca vrei sa stergi inregistrarea?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-flat-button color="primary" (click)="onCancel()">Anulează</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">Șterge</button>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 20px;
      margin-bottom: 16px;
    }
    div[mat-dialog-content] {
      font-size: 16px;
      margin-bottom: 24px;
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class DeleteConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}