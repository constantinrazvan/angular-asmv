import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Volunteer } from '../../core/models/Volunteer';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.css'
})
export class VolunteersComponent implements OnInit {
    volunteers: Volunteer[] = [];
  
    constructor(private service: VolunteersService) {}
  
    itemsPerPage = 10;
    currentPage = 1;
  
    ngOnInit(): void {
      this.fetchVolunteers();
    }
  
    fetchVolunteers() {
      this.service.getAllVolunteers().subscribe({
        next: (data: Volunteer[]) => {
          console.log(data); // Verifică structura datelor
          if (data && Array.isArray(data)) {
            this.volunteers = data.reverse(); // Accesează lista direct și o inversează
          } else {
            console.log('Datele nu conțin o listă de voluntari');
          }
        },
        error: (error: any) => {
          console.log('Eroare la aducerea voluntarilor!');
          console.log(error);
        }
      });
    }
    
    get totalItems() {
      return this.volunteers.length;
    }
  
    get paginatedVolunteers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.volunteers.slice(start, end);
    }
  
    get totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  
    changePage(page: number) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    }
  
    refresh(): void {
      this.fetchVolunteers();
      window.location.reload();
    }
  
    deleteVolunteer(id: number) {
      if (confirm('Ești sigur că vrei să ștergi acest voluntar?')) {
        this.service.deleteVolunteer(id).subscribe({
          next: () => {
            console.log("Voluntar șters cu succes");
            this.fetchVolunteers();
          },
          error: (error) => {
            console.error('Eroare la ștergerea voluntarului!', error);
          }
        });
      }
    }
    
  }
  