import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons'
import { provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { VolunteersService } from '../../core/services/volunteersService/volunteers.service';
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
    private volunteerService: VolunteersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.title = "ASMV";
  }

  refreshWeb(): void {
    window.location.reload();
  }

  async postRequest(): Promise<void> {
    let succesRoute: string = "";
    try {
      await this.volunteerService.becomeVolunteer(this.name, this.lastname, this.email, this.faculty, this.phone, this.reason).subscribe({
        next: (res) => { 
          this.router.navigate(['/']);  
        } 
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  handleSubmit(): void {
    if (this.name === '' || this.lastname === '' || this.email === '' || this.faculty === '' || this.phone === '' || this.reason === '') {
      this.error = "Te rog sa completezi toate campurile!";
    } else if (this.email.includes("@") === false) {
      this.error = "Te rog sa oferi o adresa de email valida!";
    } else {
      this.postRequest();
    }
  }
}
