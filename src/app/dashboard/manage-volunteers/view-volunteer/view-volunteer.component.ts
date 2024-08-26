import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { volunteerEnvironmet } from '../../../core/environment';

@Component({
  selector: 'app-view-volunteer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {
  volunteer: Volunteer = {} as Volunteer; // Changed to optional

  constructor(
    private service: VolunteersService,
    private route: ActivatedRoute
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
      console.log('Request URL:', url); // Add this line
    
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
    
}