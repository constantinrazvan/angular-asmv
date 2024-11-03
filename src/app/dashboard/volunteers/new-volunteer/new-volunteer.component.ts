import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../../core/models/Volunteer';

@Component({
  selector: 'app-new-volunteer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css'] // Fixed this to "styleUrls"
})
export class NewVolunteerComponent {
  volunteer: Volunteer = {} as Volunteer;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null; // Add for image preview

  constructor(private service: VolunteersService) {}

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addVolunteer(): void {
    const formData = new FormData();
    formData.append('firstname', this.volunteer.firstname || '');
    formData.append('lastname', this.volunteer.lastname || '');
    formData.append('email', this.volunteer.email || '');
    formData.append('joinedDate', this.volunteer.joinedDate || '');
    formData.append('department', this.volunteer.department || '');
    formData.append('president', this.volunteer.president ? 'true' : 'false');
    formData.append('vicePresident', this.volunteer.vicepresident ? 'true' : 'false');
    
    if (this.selectedImage) {
      formData.append('photo', this.selectedImage);
    }

    this.service.addVolunteer(formData).subscribe({
      next: (response: any) => {
        console.log('Voluntar adăugat cu succes!', response);
        this.clearForm(); // Reset form after successful addition
      },
      error: (error: any) => {
        console.log('Eroare la adăugarea voluntarului:', error);
      }
    });
  }

  clearForm(): void {
    this.volunteer = {} as Volunteer;
    this.selectedImage = null;
    this.imagePreview = null;
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
  }
}
