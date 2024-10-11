import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../../core/models/Volunteer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css'] // Fixed styleUrls
})
export class AddVolunteerComponent implements OnInit {
  volunteerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  loading = false;

  constructor(private service: VolunteersService, private router: Router, private formBuilder: FormBuilder) {
    this.volunteerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Added pattern for phone
      city: ['', Validators.required],
      status: ['', Validators.required],
      ocupation: '',
      joinedDate: ['', Validators.required],
      image: ''
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.volunteerForm.invalid) {
      this.volunteerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = new FormData();
    Object.keys(this.volunteerForm.value).forEach(key => {
      formData.append(key, this.volunteerForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.service.addVolunteer(formData).subscribe({
      next: (response) => {
        console.log('Volunteer added successfully!', response);
        this.volunteerForm.reset();
        this.imagePreview = null;
        this.loading = false;
        this.router.navigate(['/dashboard/voluntari']);
      },
      error: (error) => {
        console.log('Error adding volunteer', error);
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF).');
        return;
      }

      if (file.size > maxSize) {
        alert('File size exceeds the 5MB limit.');
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onRemoveImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
