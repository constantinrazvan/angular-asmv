import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { VolunteersService } from '../../core/services/volunteersService/volunteers.service';
import { Router } from '@angular/router';

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
    email: '',
    faculty: '',
    city: '',
    memberStatus: '',
    joiningDate: ''
  };
  public memberStatuses = [
    'MEMBRU_ADUNAREA_GENERALA',
    'MEMBRU_CONSILIU_DIRECTORIAL',
    'MEMBRU_DE_ONOARE',
    'MEMBRU_VOLUNTAR'
  ];

  constructor(private volunteersService: VolunteersService, private router: Router) {}

  ngOnInit() {
    const date = new Date();
    this.today = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  }

  public submitForm() {
    this.volunteersService.addVolunteer(this.volunteer).subscribe({
      next: response => {
        console.log('Volunteer added successfully', response);
        // Optionally, navigate to another page or clear the form
        this.router.navigate(['/volunteers']); // Update the path to where you want to navigate
      },
      error: err => {
        console.error('Error adding volunteer', err);
        // Optionally, handle the error, show a message to the user, etc.
      }
    });
  }
}
