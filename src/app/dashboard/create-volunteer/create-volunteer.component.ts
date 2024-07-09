import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-volunteer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './create-volunteer.component.html',
  styleUrls: ['./create-volunteer.component.css']
})
export class CreateVolunteerComponent implements OnInit {
  public today: string = '';
  public volunteer = {
    firstName: '',
    lastName: '',
    faculty: '',
    joiningDate: '',
    memberStatus: '',
    age: '',
    city: ''
  };
  public memberStatuses = [
    'Membru Adunarea Generala',
    'Membru de Onoare',
    'Membru Consiliu Directorial',
    'Membru Voluntar'
  ];

  ngOnInit() {
    const date = new Date();
    this.today = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  }

  public submitForm() {
    console.log('Volunteer Data:', this.volunteer);
    // Add logic to handle form submission, e.g., send the data to a server.
  }
}
