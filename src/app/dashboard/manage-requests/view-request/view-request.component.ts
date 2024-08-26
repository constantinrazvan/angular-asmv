import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BecomeVolunteer } from '../../../core/models/BecomeVolunteer';
import { RequestsService } from '../../../core/services/requests/requests.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,RouterLink],
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  request: BecomeVolunteer = {} as BecomeVolunteer;

  constructor(
    private service: RequestsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBecomeVolunteerData();
  }

  getBecomeVolunteerData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getOne(id).subscribe({
      next: (data: BecomeVolunteer) => {
        this.request = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  markAsRead(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.markAsRead(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.request.newRequest = !this.request.newRequest;
        } else {
          alert('Failed to update request status.');
        }
      },
      error: (error: any) => {
        console.error('There was an error!', error);
        alert('An error occurred while updating the request status.');
      }
    });
  }
}