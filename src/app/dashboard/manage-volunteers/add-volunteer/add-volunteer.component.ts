import { Component } from '@angular/core';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../../core/models/Volunteer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatSelectModule
  ],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent {
  volunteer: Volunteer = { 
    firstname: '', 
    lastname: '', 
    email: '', 
    city: '', 
    phone: '',
    status: '',
    joined_date: '', 
  };

  statusList: string[] = ['Adunarea Generala', 'Consiliu Directorial', 'Voluntar'];
  selectedStatus: string = '';

  constructor(private service: VolunteersService, private router: Router) {}

  // Function to format the date as 'YYYY-MM-DD'
  formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addVolunteer() {
    if (this.volunteer.joined_date) {
      this.volunteer.joined_date = this.formatDate(new Date(this.volunteer.joined_date));
    } else {
      this.volunteer.joined_date = ''; // Handle the case where no date is selected
    }
  
    // Directly assign selectedStatus to volunteer.status
    this.volunteer.status = this.selectedStatus;
  
    // Log the volunteer object to ensure data is correct
    console.log('Volunteer Data Sent:', this.volunteer);
  
    this.service.addVolunteer(this.volunteer).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/dashboard/voluntari']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}