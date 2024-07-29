import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/service.service';
import { Project } from '../../core/models/Project';
import { ProjectDTO } from '../../core/models/ProjectDTO';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectApiResponse } from '../../core/models/ProjectApiResponse';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  showConfirmModal: boolean = false;
  showAddProjectForm: boolean = false;
  projectToDelete: Project | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  newProject: ProjectDTO = { title: '', content: '', images: [] };
  showEditProjectForm: boolean = false;
  editProject: ProjectDTO = { title: '', content: '', images: [] };
  projectToEdit: Project | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  refreshData(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (response: ProjectApiResponse) => {
        if (response && Array.isArray(response.$values)) {
          this.projects = response.$values;
          this.projects.forEach(project => {
            if (project.images && project.images.$values) {
              project.images.$values.forEach(image => {
                image.filePath = image.filePath
                  .replace('wwwroot/', 'https://localhost:7155/')
                  .replace(/\\/g, '/');
              });
            }
          });
        } else {
          console.error('Expected an array in $values but got:', response);
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  toggleAddProjectModal(): void {
    this.showAddProjectForm = !this.showAddProjectForm;
  }

  closeAddProjectModal(): void {
    this.showAddProjectForm = false;
  }

  addProject(): void {
    try {
      const userId = this.getUserIdFromToken();
      this.projectService.addProject(this.newProject, userId).subscribe({
        next: (newProject: Project) => {
          if (newProject.images && newProject.images.$values) {
            newProject.images.$values.forEach(image => {
              image.filePath = image.filePath.startsWith('http')
                ? image.filePath
                : `https://localhost:7155/${image.filePath.replace('wwwroot/', '')}`;
            });
          }
          this.projects.push(newProject);
          this.newProject = { title: '', content: '', images: [] };
          this.closeAddProjectModal();
        },
        error: (error) => {
          console.error('Error adding project:', error);
        }
      });
    } catch (error: any) {
      console.error('Unexpected error:', error.message);
    }
  }

  confirmDelete(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.projectToDelete = this.paginatedProjects[index];
    this.showConfirmModal = true;
  }

  deleteProject(): void {
    // Ensure that projectToDelete is not null before proceeding
    if (this.projectToDelete) {
      const projectToDelete: Project = this.projectToDelete; // Type assertion
  
      this.projectService.deleteProject(projectToDelete.id).subscribe({
        next: () => {
          // Find the index of the project in the paginated list
          const indexInPaginated = this.paginatedProjects.indexOf(projectToDelete);
  
          // If the project is found in the paginated list, remove it
          if (indexInPaginated !== -1) {
            this.projects = this.projects.filter(project => project.id !== projectToDelete.id);
            this.closeConfirmModal();
          }
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    } else {
      console.error('No project selected for deletion');
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.projectToDelete = null;
  }

  viewProject(project: Project): void {
    this.selectedProject = {
      ...project,
      images: project.images ? {
        $id: project.images.$id,
        $values: project.images.$values.map(image => ({
          ...image,
          filePath: image.filePath.startsWith('http')
            ? image.filePath
            : `https://localhost:7155/${image.filePath.replace('wwwroot/', '')}`
        }))
      } : { $id: 'default-id', $values: [] }
    };
  }

  closeDialog(): void {
    this.selectedProject = null;
  }

  get paginatedProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.projects.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.projects.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token does not exist');
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.nameid) {
      throw new Error('Invalid token structure');
    }
    return +decodedToken.nameid;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.newProject.images = Array.from(event.target.files); // Directly use File objects
    }
  }

  onEditFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.editProject.images = Array.from(event.target.files); // Directly use File objects
    }
  }

  editProjectDetails(project: Project | null): void {
    if (project) { // Check if `project` is not null
      this.projectToEdit = project;
      this.editProject = {
        title: project.title,
        content: project.content,
        images: project.images ? [...project.images.$values] : []
      };
      this.showEditProjectForm = true;
    }
  }

  closeEditProjectModal(): void {
    this.showEditProjectForm = false;
    this.projectToEdit = null;
  }

  updateProject(): void {
    if (this.projectToEdit) {
      const userId = this.getUserIdFromToken(); // Get the userId
      this.projectService.updateProject(this.projectToEdit.id, this.editProject, userId).subscribe({
        next: (updatedProject: Project) => {
          const index = this.projects.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) {
            this.projects[index] = updatedProject;
            this.closeEditProjectModal();
          }
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    }
  }
  

  onImageError(event: Event): void {
    // Handle image load error here, for example:
    const target = event.target as HTMLImageElement;
    target.src = 'path/to/default/image.png'; // Path to a placeholder image
  }
  
}
