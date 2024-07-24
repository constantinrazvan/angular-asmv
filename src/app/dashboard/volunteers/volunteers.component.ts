import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class VolunteersComponent implements OnInit {
  volunteers: Volunteer[] = [];
  selectedVolunteer: Volunteer | null = null;
  editVolunteerData: Partial<Volunteer> | null = null;
  addVolunteerData: Partial<Volunteer> | null = null;
  confirmDeleteId: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.loadVolunteers();
  }

  loadVolunteers(): void {
    this.volunteerService.getAllVolunteers().subscribe({
      next: (data) => {
        this.volunteers = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  viewVolunteer(volunteer: Volunteer): void {
    this.selectedVolunteer = volunteer;
  }

  closeViewModal(): void {
    this.selectedVolunteer = null;
  }

  confirmDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  closeDeleteModal(): void {
    this.confirmDeleteId = null;
  }

  deleteVolunteer(): void {
    if (this.confirmDeleteId !== null) {
      this.volunteerService.deleteVolunteer(this.confirmDeleteId).subscribe({
        next: () => {
          this.loadVolunteers();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  editVolunteer(volunteer: Volunteer): void {
    this.editVolunteerData = {
      ...volunteer
      // No need to format it here; just use the Date object
    };
  }
  
  
  closeEditModal(): void {
    this.editVolunteerData = null;
  }  

  updateVolunteer(): void {
    if (this.editVolunteerData) {
      // No need to check for type here; `joined` should be Date already
      if (this.editVolunteerData.id) {
        this.volunteerService.updateVolunteer(this.editVolunteerData.id, this.editVolunteerData as Volunteer).subscribe({
          next: () => {
            this.loadVolunteers();
            this.closeEditModal();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }
  
  

  openAddModal(): void {
    this.addVolunteerData = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      status: '',
      // Use Date object directly
      joined: new Date() 
    };
  }
  
  closeAddModal(): void {
    this.addVolunteerData = null;
  }

  addVolunteer(): void {
    if (this.addVolunteerData) {
      // No need to check for type here; `joined` should be Date already
      this.volunteerService.addVolunteer(this.addVolunteerData as Volunteer).subscribe({
        next: () => {
          this.loadVolunteers();
          this.closeAddModal();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }  

  private formatDateForInput(date: Date): string {
    // Convert Date object to yyyy-mm-dd string for HTML input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get paginatedVolunteers(): Volunteer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.volunteers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.volunteers.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
