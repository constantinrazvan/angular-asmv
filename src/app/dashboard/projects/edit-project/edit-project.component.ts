import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { Project } from '../../../core/models/Project';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  project: Project = {} as Project;
  projectImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.fetchData(this.id);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchData(id: number): Observable<Project> {
    return this.http.get<Project>(`http://localhost:5235/api/projects/project/${id}`);
  }
  
  
  

  fetchImage(id: number): void {
    this.service.getProjectImage(id).subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.projectImage = reader.result as string;
        };
        reader.onerror = (error) => {
          console.error('Error reading image:', error);
        };
        reader.readAsDataURL(imageBlob);
      },
      (error) => {
        console.error('Error loading image from server:', error);
      }
    );
  }
  

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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
        this.fetchData(this.id); // Re-fetch project data to update the image
      },
      error: (error: string | null) => {
        console.log('Error updating project:', error);
      }
    });
  }
}
