import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-volunteers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-volunteers.component.html',
  styleUrls: ['./edit-volunteers.component.css']
})
export class EditVolunteersComponent implements OnInit {
  volunteerForm: FormGroup;
  volunteerId: string = '';
  selectedImage: File | null = null; // Fișierul selectat
  previewImage: string | ArrayBuffer | null = null; // Preview-ul imaginii

  constructor(
    private fb: FormBuilder,
    private service: VolunteersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.volunteerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('\\d{10}')]],
      ocupation: ['', Validators.required],
      department: ['', [Validators.required, Validators.maxLength(100)]],
      joinedDate: [''],
      president: [false],
      vicepresident: [false],
    });
  }

  ngOnInit(): void {
    this.volunteerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.volunteerId) {
      this.loadVolunteer(this.volunteerId);
    }
  }

  loadVolunteer(id: string): void {
    this.service.getVolunteer(+id).subscribe({
      next: (volunteer: Volunteer) => {
        this.volunteerForm.patchValue(volunteer);
        if (volunteer.volunteerImage && typeof volunteer.volunteerImage === 'object' && 'url' in volunteer.volunteerImage) {
          this.previewImage = volunteer.volunteerImage.url; // Setăm imaginea existentă ca preview
        }
      },
      error: (err: any) => {
        console.error('Eroare la încărcarea voluntarului:', err);
      }
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      // Creare preview pentru imagine
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  saveChanges(): void {
    if (this.volunteerForm.valid && this.selectedImage) {
        const updatedVolunteer = this.volunteerForm.value;

        const formData = new FormData();
        formData.append('firstname', updatedVolunteer.firstname);
        formData.append('lastname', updatedVolunteer.lastname);
        formData.append('email', updatedVolunteer.email);
        formData.append('department', updatedVolunteer.department);
        formData.append('phoneNumber', updatedVolunteer.phoneNumber || '');
        formData.append('joinedDate', updatedVolunteer.joinedDate || '');
        formData.append('ocupation', updatedVolunteer.ocupation);
        formData.append('president', updatedVolunteer.president ? 'true' : 'false');
        formData.append('vicePresident', updatedVolunteer.vicepresident ? 'true' : 'false');

        // Adăugăm imaginea
        formData.append('photo', this.selectedImage);

        this.service.updateVolunteer(+this.volunteerId, formData).subscribe({
            next: () => {
                console.log('Voluntar actualizat cu succes!');
                this.router.navigate(['/dashboard/voluntari']);
            },
            error: (err: any) => {
                console.error('Eroare la actualizarea voluntarului:', err);
            }
        });
    } else {
        console.warn('Formularul nu este valid sau lipsește imaginea!');
    }
  }
}