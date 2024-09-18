import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../core/models/Project';
import { ProjectsService } from '../../../core/services/projects/projects.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  project: Project = {} as Project;  
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;  

  constructor(private service: ProjectsService) {}

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

  onSubmit(): void {
    const imageToSend: File | undefined = this.selectedFile || undefined;

    this.service.addProject(this.project, imageToSend).subscribe({
      next: (data) => {
        console.log("Proiect adăugat cu succes!");
      },
      error: (error) => {
        console.log("Eroare la adăugarea proiectului:", error);
      }
    });
  }
}