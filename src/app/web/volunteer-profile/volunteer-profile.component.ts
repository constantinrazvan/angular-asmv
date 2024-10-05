import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { volunteers } from '../../core/volunteers';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-volunteer-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, WebNavbarComponent, WebFooterComponent],
  templateUrl: './volunteer-profile.component.html',
  styleUrl: './volunteer-profile.component.css'
})
export class VolunteerProfileComponent {

  constructor(
    private route: ActivatedRoute
  ){}

  id: string = this.route.snapshot.params['id'];


}