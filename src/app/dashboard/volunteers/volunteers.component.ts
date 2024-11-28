import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Volunteer } from '../../core/models/Volunteer';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit {
  volunteers: Volunteer[] = [];
  error: string = "";

  constructor(private volunteersService: VolunteersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVolunteers();
  }

  fetchVolunteers(): void {
    this.volunteersService.getVolunteers().subscribe({
      next: (data: Volunteer[]) => {
        this.volunteers = data;
        this.error = "";
      },
      error: (err: any) => {
        console.error(err);
        this.error = "Eroare! Voluntarii nu au putut fi aduși.";
        this.volunteers = [];
      },
    });
  }

  refresh(): void {
    this.volunteers = [];
    this.fetchVolunteers();
  }

  addVolunteer(): void {
    this.router.navigate(['/dashboard/add-voluntar']);
  }

  editVolunteer(volunteer: Volunteer): void {
    this.router.navigate(['/dashboard/edit-voluntar', volunteer.id]);
  }

  deleteVolunteer(volunteer: Volunteer): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);

      const allowedRoles = ["admin", "Membru Adunarea Generala", "Membru Consiliu Directorial"];
      if (allowedRoles.includes(decodedToken.role)) {
        this.volunteersService.removeVolunteer(Number(volunteer.id)).subscribe({
          next: () => {
            console.log(`Voluntar ${volunteer.firstname} ${volunteer.lastname} a fost șters.`);
            this.fetchVolunteers(); 
          },
          error: (err: any) => {
            console.error("Eroare la ștergerea voluntarului:", err);
          }
        });
      } else {
        console.warn("Utilizatorul nu are permisiunea de a șterge acest voluntar.");
        alert("Nu aveți permisiunea de a șterge acest voluntar.");
      }
    } else {
      console.error("Token-ul lipsește. Utilizatorul nu este autentificat.");
      alert("Nu sunteți autentificat. Autentificați-vă pentru a continua.");
    }
  }
}
