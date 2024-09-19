import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';

@Component({
  selector: 'app-view-volunteer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {
  volunteer: Volunteer = {} as Volunteer;
  id: number = 0;

  constructor(
    private service: VolunteersService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  getId(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
  }

  fetchUser(id: number): void {
    this.service.getOne(id).subscribe({
      next: (data: Volunteer) => {
        console.log(JSON.stringify(data));
        this.volunteer = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];  
      if (this.id) {
        this.fetchUser(this.id);
      }
    });
  }

  onSubmit() {
    this.service.updateVolunteer(this.id, this.volunteer).subscribe({
      next: () => {
        console.log("Updated!");
        this.router.navigate(['/dashboard/voluntari']);
      },
      error: (err) => {
        console.log(err);
        alert("Ceva nu a mers corect! Incercati mai tarziu!");
      }
    });
  }
  
}
