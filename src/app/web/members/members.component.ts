import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { Volunteer } from '../../core/models/Volunteer';
import { now } from 'jquery';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, AfterViewInit {

  title = "ASMV - Membri";

  membersAdunareaGenerala: Volunteer[] = [
    {
      id: 1, 
      firstname: 'Dr. Dan', 
      lastname: 'Pletea', 
      email: '', 
      phone: '', 
      status: 'Presedinte Adunarea Generala', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 2, 
      firstname: 'Dr. Florin', 
      lastname: 'Stanimir', 
      email: '', 
      phone: '', 
      status: 'Vicepresedinte Adunarea Generala', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 3,
      firstname: 'Dr. Florin',
      lastname: 'Postelnicu',
      email: '',
      phone: '',
      status: 'Secretar Adunarea Generala',
      joinedDate: '22-05-2025',
      city: ''
    }
  ];
  membersConsiliuDirectorial: Volunteer[] = [
    {
      id: 1, 
      firstname: 'Esra', 
      lastname: '', 
      email: '', 
      phone: '', 
      status: 'Presedinte', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 2,
      firstname: 'Berkant', 
      lastname: 'Güneș', 
      email: '', 
      phone: '', 
      status: 'Vicepresedinte', 
      joinedDate: '22-05-2025',
      city: ''
    },
    {
      id: 3, 
      firstname: 'Georgiana Cristina', 
      lastname: 'Iacob', 
      email: '', 
      phone: '', 
      status: 'Membru Activ - Debutant Prim Ajutor - Aj. Instructor Prim Ajutor', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 4, 
      firstname: 'Med.', 
      lastname: 'Daniela Popa', 
      email: '', 
      phone: '', 
      status: 'Membru Activ - Sef Echipaj Prim Ajutor - Instructor Prim Ajutor', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 5, 
      firstname: 'Dr. Roxana', 
      lastname: 'Stoiciu', 
      email: '', 
      phone: '', 
      status: 'Membru Activ - Sef Echipaj Prim Ajutor - Instructor Prim Ajutor', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 6, 
      firstname: 'Vlad Daniel', 
      lastname: 'Leu', 
      email: '', 
      phone: '', 
      status: 'Membru Activ - Debutant Prim Ajutor - Instructor Prim Ajutor', 
      joinedDate: '22-05-2025',
      city: ''
    }
  ];

  memberVolunteers: Volunteer[] = [
    {
      id: 1, 
      firstname: 'Ana Maria Gabriela', 
      lastname: 'Cosma', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 2, 
      firstname: 'Bianca Maria', 
      lastname: 'Francu', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 3, 
      firstname: 'Augustin', 
      lastname: 'Fricatel', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 4, 
      firstname: 'Cristina Catalina', 
      lastname: 'Gradinaru', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 5, 
      firstname: 'Marina', 
      lastname: 'Iordan', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    },
    {
      id: 6, 
      firstname: 'Bianca-Andreea', 
      lastname: 'Matei', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    },
    {
      id: 7, 
      firstname: 'Electra', 
      lastname: 'Milidonis', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 8, 
      firstname: 'Zakaria', 
      lastname: 'Rochdi', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 9, 
      firstname: 'Andrei Eusebiu', 
      lastname: 'Valimareanu', // cu diacritice
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 10, 
      firstname: 'Bianca Maria', 
      lastname: 'Herenciuc', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 11, 
      firstname: 'Cristina', 
      lastname: 'Cravcic', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 12, 
      firstname: 'Gabriela Irene', 
      lastname: 'Raicu', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''  
    }, 
    {
      id: 13, 
      firstname: 'Madalina Cristina', 
      lastname: 'Manole', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 14, 
      firstname: 'Maryem Betul', 
      lastname: 'Dag', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar - Aj. Instructor', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 15, 
      firstname: 'Raluca Florentina', 
      lastname: 'Smochina', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar - Aj. Instructor', 
      joinedDate: '22-05-2025',
      city: ''
    },
    {
      id: 16, 
      firstname: 'Bianca', 
      lastname: 'Ianus', 
      email: '', 
      phone: '', 
      status: 'Aj. Instructor PA', 
      joinedDate: '22-05-2025',
      city: ''
    },
    {
      id: 17, 
      firstname: 'Elif', 
      lastname: 'Ibadula', 
      email: '', 
      phone: '', 
      status: 'Aj. Instructor PA', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 18, 
      firstname: 'Ana-Maria', 
      lastname: 'Ionascu', 
      email: '', 
      phone: '', 
      status: 'Aj. Instructor PA', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 19, 
      firstname: 'Ana Maria Gabriela', 
      lastname: 'Brotea', 
      email: '', 
      phone: '', 
      status: 'Aj. Instructor PA', 
      joinedDate: '22-05-2025',
      city: ''
    }, 
    {
      id: 20, 
      firstname: 'Andreea Cristina', 
      lastname: 'Barbalau', 
      email: '', 
      phone: '', 
      status: 'Membru Voluntar - Aj. Instructor PA', 
      joinedDate: '22-05-2025',
      city: ''
    }
  ];

  isLoading = true;

  // constructor(private service: VolunteerService) {}

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
    // Simulate an async operation, replace with actual data fetching if needed
    setTimeout(() => {
      // Data is already available, just simulate a delay
      this.isLoading = false; // Hide spinner when data is ready
    }, 1000); // Adjust the timeout as needed
  }
}