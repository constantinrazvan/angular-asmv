import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/Project';
import { ProjectService } from '../../../core/services/project/service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { ProjectDTO } from '../../../core/models/ProjectDTO';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularEditorModule, RouterLink],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: Project = {
    id: 0,
    title: '',
    summary: '',
    content: '',
    image: '',
    userId: 0
  };

  editedProject: ProjectDTO = {
    title: '',
    summary: '',
    content: '',
    image: ''
  };

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    translate: 'no',
    customClasses: [],
    toolbarHiddenButtons: [
      ['insertImage'],
      ['insertVideo'],
      ['insertTable'],
      ['insertHtmlCode'],
      ['html'],
      ['removeFormat'],
      ['insertTable'],
      ['insertTableRow'],
      ['insertTableColumn'],
      ['removeTable']
    ]
  };

  constructor(
    private service: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) {
      this.service.getProject(projectId).subscribe({
        next: (data: Project) => {
          console.log('Fetched project data:', data); // Ensure the data includes all expected properties
  
          this.project = data;
          this.editedProject = {
            title: data.title,
            summary: data.summary,
            content: data.content,
            image: data.image
          };
  
          // Construct image preview URL
          const baseUrl = 'https://localhost:7155'; // Ensure this matches your server's base URL
          const imagePath = data.image?.startsWith('/images/') ? data.image.substring('/images/'.length) : data.image;
          this.imagePreview = `${baseUrl}/images/${imagePath}`;
          console.log('Image preview URL:', this.imagePreview);
        },
        error: (error: any) => {
          console.error('Error fetching project:', error);
        }
      });
    }
  }
  

  editProject(): void {
    if (this.project) {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const userId: string = decodedToken.nameid;
  
          const formData = new FormData();
          formData.append('title', this.editedProject.title);
          formData.append('summary', this.editedProject.summary);
          formData.append('content', this.editedProject.content);
          if (this.selectedImage) {
            formData.append('image', this.selectedImage);
          } else {
            // If no new image selected, send the current image path
            formData.append('image', this.editedProject.image || '');
          }
  
          this.service.updateProject(this.project.id, formData, +userId).subscribe({
            next: (updatedProject: Project) => {
              this.project = updatedProject;
              this.router.navigate(['/dashboard/proiecte']);
            },
            error: (error) => {
              console.error('Error updating project:', error);
            }
          });
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.error('No token found in localStorage.');
      }
    }
  }

  removeSelectedImage(): void {
    this.selectedImage = null;
    this.imagePreview = this.project.image ? `http://localhost:7155${this.project.image}` : null;
  }

  triggerFileInputClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      console.log('Selected file:', input.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image preview data URL:', e.target!.result);
        this.imagePreview = e.target!.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.selectedImage = input.files[0]; // Save the selected file
    }
  }
}
