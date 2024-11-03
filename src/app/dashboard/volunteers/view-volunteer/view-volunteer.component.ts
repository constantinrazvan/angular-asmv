import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-view-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {
  volunteer: Volunteer = {} as Volunteer;
  volunteerId = this.activatedRoute.snapshot.paramMap.get('id');
  isEdit: boolean = false;
  showReplaceInput: boolean = false;

  constructor(
    private service: VolunteersService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVolunteer();
  }

  loadVolunteer(): void {
    this.service.getVolunteer(Number(this.volunteerId)).subscribe({
      next: (volunteer: Volunteer) => { 
        this.volunteer = volunteer;
        console.log("Loaded volunteer:", volunteer);
      }, 
      error: (error: any) => {
        console.error("Failed to load volunteer:", error);
      }
    });
  }

  editModeOn(): void { 
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.isEdit = false;
    this.loadVolunteer(); 
  }

  saveChanges(): void {
    this.service.updateVolunteer(Number(this.volunteerId), this.volunteer).subscribe({
      next: () => {
        console.log('Modificările au fost salvate.');
        this.isEdit = false;
      },
      error: (error: any) => {
        console.log('Eroare la salvarea modificărilor:', error);
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.volunteer.volunteerImage = { url: reader.result as string };
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.volunteer.volunteerImage = null;
  }

  openDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  confirmDelete(): void {
    this.service.deleteVolunteer(Number(this.volunteerId)).subscribe({
      next: () => {
        console.log('Voluntar șters cu succes.');
        this.router.navigate(['/volunteers']); 
      },
      error: (error: any) => {
        console.log('Eroare la ștergerea voluntarului:', error);
      }
    });
  }

  getImageUrl(): string | null {
    if (typeof this.volunteer.volunteerImage === 'string') {
      return this.volunteer.volunteerImage;
    } else if (typeof this.volunteer.volunteerImage === 'object' && this.volunteer.volunteerImage && 'url' in this.volunteer.volunteerImage) {
      return this.volunteer.volunteerImage.url;
    }
    return null;
  }
}
