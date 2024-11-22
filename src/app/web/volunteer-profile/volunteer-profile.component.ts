import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';

@Component({
  selector: 'app-volunteer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, WebNavbarComponent, WebFooterComponent],
  templateUrl: './volunteer-profile.component.html',
  styleUrl: './volunteer-profile.component.css'
})
export class VolunteerProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private service: VolunteersService,
  ){}

  volunteer: Volunteer = {} as Volunteer;
  id: string = this.route.snapshot.params['id'];

  ngOnInit(): void {
    if(this.id != null) {
      this.service.getVolunteer(+this.id).subscribe({
        next: (response: Volunteer) => {
          this.volunteer =  response;
        }, 
        error: (error) => {  
          console.log(error);
        }
      })
    }
  }
}