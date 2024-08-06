import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { VolunteerService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';
import { now } from 'jquery';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, AfterViewInit {

  title = "ASMV - Membri";

  membersAdunareaGenerala: Volunteer[] = [];
  membersConsiliuDirectorial: Volunteer[] = [];
  membersOnoare: Volunteer[] = [];
  membersActives: Volunteer[] = [
    {
      id: 1, 
      firstName: 'Georgia', 
      lastName: 'Iacob', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Activ', 
      joined: new Date(),
    }
  ];
  memberVolunteers: Volunteer[] = [
    {
      id: 1, 
      firstName: 'Ana Maria Gabriela', 
      lastName: 'Cosma', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 2, 
      firstName: 'Bianca Maria', 
      lastName: 'Francu', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 3, 
      firstName: 'Augustin', 
      lastName: 'Fricatel', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 4, 
      firstName: 'Cristina Catalina', 
      lastName: 'Gradinaru', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 5, 
      firstName: 'Marina', 
      lastName: 'Iordan', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    },
    {
      id: 5, 
      firstName: 'Bianca-Andreea', 
      lastName: 'Matei', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    },
    {
      id: 6, 
      firstName: 'Electra', 
      lastName: 'Milidonis', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 7, 
      firstName: 'Zakaria', 
      lastName: 'Rochdi', 
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }, 
    {
      id: 8, 
      firstName: 'Andrei Eusebiu', 
      lastName: 'Valimareanu', // cu diacritice
      email: '', 
      phoneNumber: '', 
      status: 'Membru Voluntar', 
      joined: new Date(),
    }
  ];
  memberAjInstructorPA: Volunteer[] = [
    {
      id: 1, 
      firstName: 'Bianca', 
      lastName: 'Ianus', 
      email: '', 
      phoneNumber: '', 
      status: '', 
      joined: new Date(),
    },
    {
      id: 2, 
      firstName: 'Elif', 
      lastName: 'Ibadula', 
      email: '', 
      phoneNumber: '', 
      status: 'Aj. Instructor PA', 
      joined: new Date(),
    }, 
    {
      id: 3, 
      firstName: 'Ana-Maria', 
      lastName: 'Ionascu', 
      email: '', 
      phoneNumber: '', 
      status: 'Aj. Instructor PA', 
      joined: new Date(),
    }
  ];

  constructor(private service: VolunteerService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit() {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element: any) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  loadMembers(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.service.getAllVolunteers().subscribe({
      next: (res: any) => {
        
        console.log('Volunteers:', res); 
        
        if (res.$values && Array.isArray(res.$values)) {
          const volunteers: Volunteer[] = res.$values;
          
          this.membersAdunareaGenerala = [];
          this.membersConsiliuDirectorial = [];
          this.memberVolunteers = [];

          for (let volunteer of volunteers) {
            if (volunteer.status === "Membru Adunarea Generala") {
              this.membersAdunareaGenerala.push(volunteer);
            } else if (volunteer.status === "Membru Consiliu Directorial") {
              this.membersConsiliuDirectorial.push(volunteer);
            }else if (volunteer.status === "Membru Activ") {
              this.membersActives.push(volunteer);
            } else if (volunteer.status === "Membru Onoare") {
              this.membersOnoare.push(volunteer);
            } else if (volunteer.status === "Membru Voluntar") {
              this.memberVolunteers.push(volunteer);
            } 
          }
          console.log('membersAdunareaGenerala:', this.membersAdunareaGenerala);
          console.log('membersConsiliuDirectorial:', this.membersConsiliuDirectorial);
          console.log('memberVolunteers:', this.memberVolunteers);
        
        } else {
          console.error('Data is not in expected format', res);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
