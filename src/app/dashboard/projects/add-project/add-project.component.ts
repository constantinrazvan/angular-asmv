import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  projectForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private service: ProjectsService, private router: Router) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
      imageUrl: ['']
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
      fileInput.value = ''; // Reset the file input field
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('title', this.projectForm.value.title);
    formData.append('content', this.projectForm.value.content);
    formData.append('summary', this.projectForm.value.summary);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.service.addProject(formData).subscribe({
      next: (response: any) => {
        console.log('Project added successfully', response);
        this.projectForm.reset();
        this.imagePreview = null;
        this.loading = false;
        this.router.navigate(['/dashboard/proiecte'])
      },
      error: (error) => {
        console.error('Error adding project', error);
        this.loading = false;
      }
    });
  }  
}
