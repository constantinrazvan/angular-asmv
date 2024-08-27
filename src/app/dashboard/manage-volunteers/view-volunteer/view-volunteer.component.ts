import { Component, OnInit, NO_ERRORS_SCHEMA  } from '@angular/core';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { volunteerEnvironmet } from '../../../core/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-view-volunteer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, RouterLink, FormsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewVolunteerComponent implements OnInit {
  volunteer: Volunteer = {} as Volunteer;
  isEditing: boolean = false;

  statusList: string[] = ['Adunarea Generala', 'Consiliu Directorial', 'Voluntar'];

  constructor(
    private service: VolunteersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void { 
    this.getVolunteer();
  }

  getVolunteer(): void { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID');
      return;
    }
    
    const url = `${volunteerEnvironmet.getOne}${id}`;
    console.log('Request URL:', url);
    
    this.service.getOne(id).subscribe({
      next: (data) => {
        this.volunteer = data;
      },
      error: (e) => {
        console.error('Failed to fetch volunteer data', e);
      },
      complete: () => {
        console.log('Data retrieval complete');
      }
    });
  }

  editVolunteer(): void {
    this.isEditing = true;
  }

  updateVolunteer(): void {
    this.service.updateVolunteer(this.volunteer.id!, this.volunteer).subscribe({
      next: (data) => {
        console.log('Volunteer updated:', data);
        this.volunteer = data;
        this.isEditing = false;
      },
      error: (e) => console.error('Update failed:', e)
    });
  }

  cancelEdit(): void {
    this.getVolunteer(); // Re-fetch the volunteer data to reset changes
    this.isEditing = false;
  }
  
  deleteVolunteer(): void { 
    this.service.deleteVolunteer(this.volunteer.id!).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/dashboard/voluntari']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}