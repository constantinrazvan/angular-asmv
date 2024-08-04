import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/service.service';
import { Project } from '../../core/models/Project';
import { ProjectDTO } from '../../core/models/ProjectDTO';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  showConfirmModal: boolean = false;
  showAddProjectForm: boolean = false;
  projectToDelete: Project | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  newProject: ProjectDTO = { title: '', summary: '', content: '', image: '' };
  showEditProjectForm: boolean = false;
  editProject: ProjectDTO = { title: '', summary: '', content: '', image: '' };
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
      next: (response: any) => {
        if (response && response.$values && Array.isArray(response.$values)) {
          this.projects = response.$values.map((project: Project) => ({
            ...project,
            image: project.image
              ? project.image.replace('wwwroot/', 'https://localhost:7155/').replace(/\\/g, '/')
              : ''
          }));
        } else {
          console.error('Expected an array in $values but got:', response);
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  confirmDelete(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.projectToDelete = this.paginatedProjects[index];
    this.showConfirmModal = true;
  }

  deleteProject(): void {
    if (this.projectToDelete) {
      this.projectService.deleteProject(this.projectToDelete.id).subscribe({
        next: () => {
          this.projects = this.projects.filter(project => project.id !== this.projectToDelete!.id);
          this.closeConfirmModal();
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
}
