import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons'
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-become-volunteer',
  standalone: true,
  templateUrl: './become-volunteer.component.html',
  styleUrls: ['./become-volunteer.component.css'], 
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  providers: [provideIcons({bootstrapTelephoneFill, bootstrapEnvelopeFill, bootstrapGeoAltFill})]
})
export class BecomeVolunteerComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    document.title = "ASMV";
  }

  refreshWeb(): void {
    window.location.reload();
  }

  async postRequest(): Promise<void> {
    try {
      const payload = {
        name: this.name,
        lastName: this.lastname,
        email: this.email,
        faculty: this.faculty,
        phone: this.phone,
        reasonForVolunteering: this.reason
      };

      const response = await fetch("http://localhost:9090/volunteer/newVolunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        this.showDangerAlert = true;
        setTimeout(() => this.showDangerAlert = false, 60000);
      } else {
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 12000);
        this.formSent = true;
        setTimeout(() => this.refreshWeb(), 3000);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error creating new volunteer: ", error.message);
      } else {
        console.log("An unexpected error occurred:", error);
      }
      this.showDangerAlert = true;
      setTimeout(() => this.showDangerAlert = false, 15000);
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.name.length || !this.lastname.length || !this.email.length || !this.faculty.length || !this.phone.length || !this.reason.length) {
      this.error = "Te rog sa completezi toate campurile!";
    } else if (!this.email.includes("@")) {
      this.error = "Te rog sa oferi o adresa de email valida!";
    } else {
      this.postRequest();
    }
  }

  setEmail(event : Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  setName(event: Event): void {
    this.name = (event.target as HTMLInputElement).value;
  }

  setLastname(event: Event): void {
    this.lastname = (event.target as HTMLInputElement).value;
  }

  setFaculty(event: Event): void {
    this.faculty = (event.target as HTMLInputElement).value;
  }

  setPhone(event: Event): void {
    this.phone = (event.target as HTMLInputElement).value;
  }

  setReason(event: Event): void {
    this.reason = (event.target as HTMLInputElement).value;
  }


}
