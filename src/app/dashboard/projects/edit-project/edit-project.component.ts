import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../../core/models/Project'; 

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
  project: Project | null = null;
  projectImage: string | null = null;
  selectedFile: File | null = null;
  imageToDelete: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService
  ) {}

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchProjectData(this.id);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchProjectData(id: number): void {
    this.service.getProject(id).subscribe({
      next: (projectData: Project) => {
        this.project = projectData;
        this.projectImage = projectData.imageUrl 
          ? `http://localhost:5235${projectData.imageUrl}` 
          : null;
      },
      error: (error) => {
        console.error('Error fetching project data:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageToDelete = false; 

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(): void {
    this.imageToDelete = true;
    this.projectImage = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (!this.project) {
      console.error('Project data is not available');
      return;
    }

    const updatedProjectData: Project = {
      ...this.project,
      title: this.project.title,
      content: this.project.content,
      summary: this.project.summary,
      imageUrl: this.imageToDelete ? null : this.project.imageUrl
    };

    this.service.updateProject(this.id, updatedProjectData, this.selectedFile || undefined).subscribe({
      next: (updatedProject) => {
        console.log('Project updated successfully:', updatedProject);
        this.fetchProjectData(this.id);
      },
      error: (error) => {
        console.log('Error updating project:', error);
      }
    });
  }
}