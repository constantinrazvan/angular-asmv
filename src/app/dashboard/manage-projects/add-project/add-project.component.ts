import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Project } from '../../../core/models/Project';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { projectEnvironment } from '../../../core/environment';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterLink, 
    MatCardModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  project: Project = {
    id: 0,
    title: '',
    content: '',
    summary: '',
    image: undefined
  };
  selectedFile: File | undefined = undefined;

  constructor(private projectsService: ProjectsService, private router: Router) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      // Set image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.project.image = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.project.image = undefined;
    this.selectedFile = undefined;
  }

  submitProject(): void {
    this.projectsService.addProject(this.project, this.selectedFile).subscribe(
      (response: Project) => {
        console.log('Proiectul a fost adăugat cu succes:', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Eroare la adăugarea proiectului:', error);
      }
    );
  }
}