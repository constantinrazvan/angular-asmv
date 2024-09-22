import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../../core/services/projects/projects.service';

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

  constructor(private fb: FormBuilder, private service: ProjectsService) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

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
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('projectDto', new Blob([JSON.stringify(this.projectForm.value)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.service.addProject(formData).subscribe(
      response => {
        console.log('Project added successfully', response);
        // Optionally, reset the form or redirect
      },
      error => {
        console.error('Error adding project', error);
      }
    );
  }
}
