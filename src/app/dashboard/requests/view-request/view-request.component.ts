import { Component, OnInit } from '@angular/core';
import { BecomeVolunteer } from '../../../core/models/BecomeVolunteer';
import { RequestsService } from '../../../core/services/requests/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)] in template
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css'] 
})
export class ViewRequestComponent implements OnInit {
  request: BecomeVolunteer = {} as BecomeVolunteer;
  id: number = 0;
  constructor(
    private service: RequestsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];  
      if (this.id) {
        this.fetchData(this.id);
      }
    });
  }

  fetchData(id: number): void {
    this.service.getOne(id).subscribe({
      next: (data: BecomeVolunteer) => {
        console.log('Data retrived');
        console.log(JSON.stringify(data, null, 2));

        this.request = data;
      },
      error: (err) =>  {
        console.log(err);
      }
    })
  }

  getId(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
  }

  onSubmit(): void {
    // Empty function - to be implemented
  }
}
