import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { ActivatedRoute } from '@angular/router';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';
import { QRCodeModule } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-ecuson-digital',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  templateUrl: './ecuson-digital.component.html',
  styleUrl: './ecuson-digital.component.css'
})
export class EcusonDigitalComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: VolunteersService
  ) {}

  volunteer: Volunteer = {} as Volunteer;
  userId: string | number = 0;

  getId() : void  {  
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
      }
    });
  }

  ngOnInit(): void {
    this.getId();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id; // Setează userId ca număr
        this.service.getVolunteer(this.userId).subscribe({
          next: (response) => {
            this.volunteer = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        console.error('No ID provided in the route!');
      }
    });
  }
  
}
