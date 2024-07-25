import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project/service.service';
import { Project } from '../../core/models/Project';
import { ProjectDTO } from '../../core/models/ProjectDTO';
import { jwtDecode } from 'jwt-decode'; // Fix the import here
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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  newProject: ProjectDTO = { title: '', content: '' };
  showAddProjectForm: boolean = false;

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
        if (data && Array.isArray(data.$values)) { // Adjust this line based on the actual structure
          this.projects = data.$values; // Use the correct property for the array
        } else {
          console.error('Data is not an array', data);
          this.projects = [];
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteProject(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const projectId = this.projects[startIndex + index].id;
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.projects.splice(startIndex + index, 1);
      },
      error: (error) => {
        console.log(error);
      }
    });
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
      throw new Error('Token not found');
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.nameid) {
      throw new Error('Invalid token structure');
    }
    return +decodedToken.nameid; // Convert to number
  }

  toggleAddProjectForm(): void {
    this.showAddProjectForm = !this.showAddProjectForm;
  }

  addProject(): void {
    try {
      const userId = this.getUserIdFromToken();
      this.projectService.addProject(this.newProject, userId).subscribe({
        next: (newProject) => {
          if (this.projects && Array.isArray(this.projects)) {
            this.projects.push(newProject);
          } else {
            this.projects = [newProject];
          }
          this.newProject = { title: '', content: '' }; // Reset form
          this.showAddProjectForm = false; // Hide form after submission
        },
        error: (error) => {
          console.log(error);
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
