import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/service.service';
import { Project } from '../../core/models/Project';
import { ProjectDTO } from '../../core/models/ProjectDTO';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  newProject: ProjectDTO = { title: '', content: '' };

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  refreshData(): void {
    location.reload();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.$values)) {
          this.projects = data.$values;
        } else {
          console.error('Datele nu sunt un array', data);
          this.projects = [];
        }
      },
      error: (error) => {
        console.log('Eroare la încărcarea proiectelor:', error);
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
        next: (newProject) => {
          this.projects.push(newProject);
          this.newProject = { title: '', content: '' };
          this.closeAddProjectModal();
        },
        error: (error) => {
          console.log('Eroare la adăugarea proiectului:', error);
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  confirmDelete(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.projectToDelete = this.projects[startIndex + index];
    this.showConfirmModal = true;
  }

  deleteProject(): void {
    if (this.projectToDelete) {
      this.projectService.deleteProject(this.projectToDelete.id).subscribe({
        next: () => {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const index = this.projects.indexOf(this.projectToDelete!);
          if (index !== -1) {
            this.projects.splice(startIndex + index, 1);
          }
          this.closeConfirmModal();
        },
        error: (error) => {
          console.log('Eroare la ștergerea proiectului:', error);
        }
      });
    }
  }
  

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.projectToDelete = null;
  }

  viewProject(project: Project): void {
    this.selectedProject = project;
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
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token neexistent');
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.nameid) {
      throw new Error('Structura token-ului invalidă');
    }
    return +decodedToken.nameid; // Convertire la număr
  }
}
