import { Component } from '@angular/core';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../../core/models/Volunteer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatNativeDateModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent {
  volunteer: Volunteer = { 
    id: 0, 
    firstname: '', 
    lastname: '', 
    email: '', 
    city: '', 
    phone: '',
    joined_date: '', 
    status: ''
  };

  statusList: string[] = ['Adunarea Generala', 'Consiliu Directorial', 'Voluntar'];
  selectedStatus: string = '';

  constructor(
    private service: VolunteersService
  ) {}

  addVolunteer() {
    this.service.addVolunteer(this.volunteer).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}
