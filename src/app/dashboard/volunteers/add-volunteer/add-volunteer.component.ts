import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../core/models/Volunteer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-volunteer.component.html',
  styleUrl: './add-volunteer.component.css'
})
export class AddVolunteerComponent {
  volunteer: Volunteer = {} as Volunteer;

  constructor(
    private service: VolunteersService,
    private router: Router
  ){}

  onSubmit() : void { 
    this.service.addVolunteer(this.volunteer).subscribe({
      next: (data) => { 
        console.log("Data retrived: ");
        console.log(data, null, 2);
        this.router.navigate(['/dashboard/voluntari'])
      }, 
      error: (err) => { 
        console.log(err);
      }
    })
  }
}