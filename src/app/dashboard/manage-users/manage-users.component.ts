import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  displayedColumns: string[] = ['name', 'email', 'createdAt', 'status', 'actions'];
  dataSource = [
    { name: 'John Doe', email: 'john@example.com', createdAt: '2021-01-01', status: 'Membru Consiliu Directorial' },
    { name: 'Jane Smith', email: 'jane@example.com', createdAt: '2021-02-15', status: 'Membru Adunarea Generala' },
    { name: 'Tom Johnson', email: 'tom@example.com', createdAt: '2021-03-10', status: 'Membru de Onoare' },
    { name: 'Alice Brown', email: 'alice@example.com', createdAt: '2021-04-05', status: 'membru voluntar' }
  ];

  constructor(public dialog: MatDialog) {}

  onEdit(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the edit logic here
        console.log('User edited:', result);
      }
    });
  }

  onDelete(user: any) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the delete logic here
        console.log('User deleted:', result);
        // You can also update the dataSource to remove the deleted user
        this.dataSource = this.dataSource.filter(u => u !== user);
      }
    });
  }

  onChangePassword(user: any) {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the change password logic here
        console.log('Password changed for user:', result);
      }
    });
  }
}
