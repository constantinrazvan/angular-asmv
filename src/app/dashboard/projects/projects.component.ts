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

  successMessage: string | null = null;
  errorMessage: string | null = null;

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

  fetchProjects(): void {
    this.service.getAllProjects().subscribe({
      next: (response: any) => {
        console.log('Projects received:', response);
        this.projects = (response || []).reverse();

        if(this.projects.length == 0) {
          this.successMessage = "Proiectele au fost incarcate cu succes dar din pacate nu ai nici un proiect creat!";
          this.errorMessage = null;
        } else {
          this.successMessage = 'Proiectele au fost încărcate cu succes!';
          this.errorMessage = null;
        }
  
        // Ascundem notificarea după 5 secunde
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: (error: string | null) => {
        this.errorMessage = 'A apărut o eroare la încărcarea proiectelor.';
        this.successMessage = null;
  
        // Ascundem notificarea după 5 secunde
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  }
  

  onDelete(id: number): void {
    if (confirm('Ești sigur că vrei să ștergi acest proiect?')) {
      this.service.deleteProject(id).subscribe({
        next: () => {
          this.successMessage = 'Proiectul a fost șters cu succes!';
          this.errorMessage = null; // Ascundem mesajele de eroare dacă există
          this.projects = this.projects.filter(project => project.id !== id);
  
          // Ascundem notificarea după 5 secunde
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (error: string | null) => {
          this.errorMessage = 'A apărut o eroare la ștergerea proiectului. Încercați din nou.';
          this.successMessage = null; // Ascundem mesajele de succes dacă există
  
          // Ascundem notificarea după 5 secunde
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    }
  }    

  logProjectId(id: number) {
    console.log("Navigating to edit project with ID:", id);
  }  
}