import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Project } from '../../core/models/Project';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private service: ProjectsService
  ){}

  ngOnInit(): void {
    this.fetchProjects();
  }

  projects : Project[] = [];

  itemsPerPage = 5;
  currentPage = 1;

  get totalItems() {
    return this.projects.length;
  }

  get paginatedProjects() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.projects.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  refresh(): void { 
    this.fetchProjects();
    window.location.reload();
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; 
    this.currentPage = page;
  }

  fetchProjects() : void { 
    this.service.getAllProjects().subscribe({
      next: (data: Project[]) => { 
        console.log(data);
        this.projects = data.reverse();
      },
      error: (error: string | null) => { 
        console.log("Eroare la aducerea proiectelor!");
        console.log(error);
      }
    })
  }

  onDelete(id: number): void {
    if (confirm('Esti sigur ca vrei sa stergi acest proiect?')) {
      this.service.deleteProject(id).subscribe({
        next: (response: string) => { 
          console.log("Proiectul a fost sters cu succes!");
        }, 
        error: (error: string | null) => { 
          console.log("Eroare la stergerea proiectului");
        }
      })
    }
  }

  logProjectId(id: number) {
    console.log("Navigating to edit project with ID:", id);
  }  
}