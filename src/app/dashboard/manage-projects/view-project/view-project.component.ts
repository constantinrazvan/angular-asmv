import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../../../core/models/Project';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-project',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatInputModule, RouterLink],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: Project = { id: 0, title: '', content: '', summary: '' };
  projectImage: string | null = null;
  isEditing: boolean = false;
  selectedFile: File | null = null;
  imageRemoved: boolean = false;
  imageNotFound: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private http: HttpClient
  ) {}

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.getProject(this.id);
    this.getProjectImage(this.id);
  }

  getProject(id: number): void {
    console.log(`Fetching project with ID: ${id}`);
    this.projectsService.getOneProject(id).subscribe({
      next: (data) => {
        console.log('Project data received:', data);
        this.project = data;
      },
      error: (e) => {
        console.error('Error fetching project:', e);
      }
    });
  }
  

  getProjectImage(id: number): void {
    this.projectsService.getProjectImage(id).pipe(
      catchError(err => {
        if (err.status === 404) {
          console.warn('Imaginea nu a fost găsită.');
          this.projectImage = null; // Clear the image if it's not found
          this.imageNotFound = true; // Set a flag indicating the image was not found
        } else {
          console.error('Eroare la descărcarea imaginii:', err);
        }
        return of(null);
      })
    ).subscribe(blob => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.projectImage = reader.result as string;
          this.imageNotFound = false; // Reset the flag if the image loads successfully
        };
        reader.readAsDataURL(blob);
      }
    });
  }
  

  deleteImage(): void {
    this.projectImage = null; // Remove image from view
    this.selectedFile = null; // Clear selected file
    this.imageRemoved = true; // Flag to indicate image removal
    this.isEditing = true; // Ensure the edit mode is active
  }
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.projectImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProject(): void {
    const formData = new FormData();
    formData.append('title', this.project.title);
    formData.append('content', this.project.content);
    formData.append('summary', this.project.summary);
    
    // Include the image only if selectedFile is not null
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    // Include a flag to indicate image removal
    if (this.imageRemoved) {
      formData.append('removeImage', 'true'); // Flag to indicate image removal
    }
  
    console.log('FormData being sent:', formData);
  
    this.projectsService.updateProject(this.id, this.project, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Project updated successfully:', response);
        this.isEditing = false;
        this.selectedFile = null; // Clear selected file
        this.imageRemoved = false; // Reset the image removal flag
        this.getProject(this.id); // Refresh project data
      },
      error: (error) => {
        console.error('Error saving project:', error);
      }
    });
  }  
  
  cancelEditing(): void {
    this.getProject(this.id); // Re-fetch project to discard changes
    this.isEditing = false;
  }

  deleteProject(): void {
    // Implement your delete logic here
  }
}