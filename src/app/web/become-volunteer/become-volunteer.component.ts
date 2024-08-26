import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';
import { RequestsService } from '../../core/services/requests/requests.service';

@Component({
  selector: 'app-become-volunteer',
  standalone: true,
  templateUrl: './become-volunteer.component.html',
  styleUrls: ['./become-volunteer.component.css'],
  imports: [CommonModule, FormsModule, WebNavbarComponent, WebFooterComponent],
  providers: [provideIcons({ bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill })]
})
export class BecomeVolunteerComponent implements OnInit {

  constructor(
    private router: Router, 
    private service: RequestsService
  ) {}

  title = "ASMV - Devino Voluntar";
  asmvEmail: string = 'asmv.ct@gmail.com';
  becomeVolunteer: BecomeVolunteer = {
    fullname: '',
    email: '',
    faculty: '',
    phone: '',
    reason: '',
    newRequest: true
  };
  error: string = '';
  formSent: boolean = false;

  ngOnInit(): void {
    document.title = "ASMV";

    this.error = "Din pacate, in momentul actual nu functioneaza acest serviciu. Te rugam sa ne contactezi prin intermediul unei platforme social media sau pe mail.";
  }

  validator(): boolean {
    if (!this.becomeVolunteer.fullname || !this.becomeVolunteer.email || !this.becomeVolunteer.faculty || !this.becomeVolunteer.phone || !this.becomeVolunteer.reason) {
      this.error = "Toate campurile sunt obligatorii";
      window.alert(this.error);
      return false;
    }

    if (!this.becomeVolunteer.email.includes("@")) {
      this.error = "Email invalid";
      window.alert(this.error);
      return false;
    }

    if (this.becomeVolunteer.phone.length !== 10 || !this.becomeVolunteer.phone.split('').every(char => !isNaN(Number(char)))) {
      this.error = "Numar invalid";
      window.alert(this.error);
      return false;
    }

    return true;
  }

  becomeVolunteerPost() {
    if (this.validator()) {
      this.service.addRequest(this.becomeVolunteer).subscribe({
        next: (data: any) => {
          console.log('Răspuns primit:', data);
          this.router.navigate(['/']);
        },
        error: (error) => console.error('There was an error!', error)
      });
    }
  }
}
