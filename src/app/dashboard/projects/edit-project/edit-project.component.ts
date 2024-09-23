import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ProjectResponse {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string; // Assuming this is the structure of your response
}

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {
  private id: number = 0;
  private subscription: Subscription | null = null;
  project: ProjectResponse | null = null; // Changed to match the response type
  projectImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(params => {
      this.id = +params['id']; // Convert string to number
      this.fetchProjectData(this.id); // Fetch project data
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchProjectData(id: number): void {
    console.log(`Fetching project data for ID: ${id}`); // Log ID-ul cererii
    this.http.get<ProjectResponse>(`http://localhost:5235/api/projects/project/${id}`).subscribe(
      (projectData) => {
        console.log('Response received:', projectData); // Log răspunsul complet
        this.project = projectData; // Setează direct proiectul
        this.projectImage = projectData.imageUrl || null; // Setează URL-ul imaginii
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file
    }
  }

  onSubmit(): void {
    if (!this.project) {
      console.error('Project data is not available');
      return;
    }

    this.service.updateProject(this.id, this.project, this.selectedFile).subscribe({
      next: (updatedProject) => {
        console.log('Project updated successfully:', updatedProject);
        this.fetchProjectData(this.id); // Re-fetch project data to update the image
      },
      error: (error: string | null) => {
        console.log('Error updating project:', error);
      }
    });
  }
}
