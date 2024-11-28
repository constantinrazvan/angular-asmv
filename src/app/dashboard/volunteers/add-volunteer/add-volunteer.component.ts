import { Component } from '@angular/core';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent {
  volunteerForm: FormGroup;
  selectedImage: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  defaultImagePath: string = 'assets/logoFooter.jpg'; // Calea imaginii implicite

  constructor(
    private service: VolunteersService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.volunteerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('\\d{10}')]],
      ocupation: ['', Validators.required],
      department: ['', [Validators.required, Validators.maxLength(100)]],
      joinedDate: ['', [Validators.required]],
      president: [false],
      vicepresident: [false],
      volunteerImage: [null],
      secretary: [false]
    });

    // Setăm imaginea implicită pentru preview
    this.previewImage = this.defaultImagePath;
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      // Generăm preview-ul imaginii selectate
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      // Dacă nu se selectează o imagine, setăm imaginea implicită
      this.selectedImage = null;
      this.previewImage = this.defaultImagePath;
    }
  }

  addVolunteer(): void {
    const formData = new FormData();

    if (this.volunteerForm.valid) {
      Object.keys(this.volunteerForm.value).forEach((key) => {
        const value = this.volunteerForm.value[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      // Adăugăm imaginea selectată sau imaginea implicită
      if (this.selectedImage) {
        formData.append('photo', this.selectedImage);
      } else {
        formData.append('photo', this.defaultImagePath); // Trimiterea imaginii implicite
      }

      this.service.addVolunteer(formData).subscribe({
        next: (response) => {
          console.log('Voluntar adăugat cu succes!', response);
          this.router.navigate(['/dashboard/voluntari']);
        },
        error: (err) => {
          console.error('Eroare la adăugarea voluntarului:', err);
        }
      });
    } else {
      console.warn('Formularul nu este valid!');
    }
  }
}
