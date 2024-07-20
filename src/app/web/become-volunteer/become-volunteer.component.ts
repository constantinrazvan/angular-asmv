import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons'
import { provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-become-volunteer',
  standalone: true,
  templateUrl: './become-volunteer.component.html',
  styleUrls: ['./become-volunteer.component.css'], 
  imports: [CommonModule, FormsModule, WebNavbarComponent, WebFooterComponent],
  providers: [provideIcons({bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill})]
})
export class BecomeVolunteerComponent implements OnInit {

  title = "ASMV - Devino Voluntar";

  asmvEmail: string = 'asmv.ct@gmail.com';

  name: string = '';
  lastname: string = '';
  email: string = '';
  faculty: string = '';
  phone: string = '';
  reason: string = '';
  error: string = '';
  showAlert: boolean = false;
  showDangerAlert: boolean = false;
  formSent: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    document.title = "ASMV";
  }

}
