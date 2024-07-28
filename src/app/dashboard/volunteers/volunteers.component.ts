import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
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

  refreshData(): void {
    location.reload();
  }

  loadVolunteers(): void {
    this.volunteerService.getAllVolunteers().subscribe({
      next: (data: any) => {
        if (data && Array.isArray(data.$values)) {
          this.volunteers = this.reverseVolunteers(data.$values);
        } else if (Array.isArray(data)) {
          this.volunteers = this.reverseVolunteers(data);
        } else {
          console.error('Data is not an array', data);
          this.volunteers = [];
        }
      },
      error: (error) => {
        console.error('Error loading volunteers:', error);
      }
    });
  }

  reverseVolunteers(data: Volunteer[]): Volunteer[] {
    let stack: Volunteer[] = [];
    for (let volunteer of data) {
      stack.push(volunteer);
    }

    let reversedVolunteers: Volunteer[] = [];
    while (stack.length > 0) {
      reversedVolunteers.push(stack.pop()!);
    }

    return reversedVolunteers;
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
          console.error('Error deleting volunteer:', error);
        }
      });
    }
  }

  editVolunteer(volunteer: Volunteer): void {
    this.editVolunteerData = { ...volunteer };
  }

  closeEditModal(): void {
    this.editVolunteerData = null;
  }

  updateVolunteer(): void {
    if (this.editVolunteerData && this.editVolunteerData.id) {
      this.volunteerService.updateVolunteer(this.editVolunteerData.id, this.editVolunteerData as Volunteer).subscribe({
        next: () => {
          this.loadVolunteers();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating volunteer:', error);
        }
      });
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
      joined: new Date()
    };
  }

  closeAddModal(): void {
    this.addVolunteerData = null;
  }

  addVolunteer(): void {
    if (this.addVolunteerData) {
      this.volunteerService.addVolunteer(this.addVolunteerData as Volunteer).subscribe({
        next: () => {
          this.loadVolunteers();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error adding volunteer:', error);
        }
      });
    }
  }

  public formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
