import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BecomevolunteerService } from '../../core/services/becomeVolunteer/becomevolunteer.service';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';

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
    private service: BecomevolunteerService,
    private router: Router
  ) {}

  title = "ASMV - Devino Voluntar";
  asmvEmail: string = 'asmv.ct@gmail.com';
  becomeVolunteer: BecomeVolunteer = { ...this.service.becomeVolunteerEmpty };
  error: string = '';
  formSent: boolean = false;

  ngOnInit(): void {
    document.title = "ASMV";

    this.error = "Din pacate, in momentul actual nu functioneaza acest serviciu. Te rugam sa ne contactezi prin intermediul unei platforme social media sau pe mail.";
  }

  validator(): boolean {
    if (!this.becomeVolunteer.firstName || !this.becomeVolunteer.lastName || !this.becomeVolunteer.email || !this.becomeVolunteer.faculty || !this.becomeVolunteer.phoneNumber || !this.becomeVolunteer.reason) {
      this.error = "Toate campurile sunt obligatorii";
      window.alert(this.error);
      return false;
    }

    if (!this.becomeVolunteer.email.includes("@")) {
      this.error = "Email invalid";
      window.alert(this.error);
      return false;
    }

    if (this.becomeVolunteer.phoneNumber.length !== 10 || !this.becomeVolunteer.phoneNumber.split('').every(char => !isNaN(Number(char)))) {
      this.error = "Numar invalid";
      window.alert(this.error);
      return false;
    }

    return true;
  }

  becomeVolunteerPost() {
    // if (!this.validator()) {
    //   return;
    // }
    // console.log(this.becomeVolunteer);
    // this.service.addVolunteer(this.becomeVolunteer).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.formSent = true;
    //     this.router.navigate(['/']);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.error = err.error.errors || { general: 'An error occurred' };
    //     window.alert(this.error);
    //   }
    // });
   this.error = "Din pacate, in momentul actual nu functioneaza acest serviciu. Te rugam sa ne contactezi prin intermediul unei platforme social media sau pe mail.";
  }
}
