import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    { title: 'Proiectul A', summary: 'Sumar despre Proiectul A. Acest proiect are ca obiectiv dezvoltarea unei aplicații mobile.' },
    { title: 'Proiectul B', summary: 'Sumar despre Proiectul B. Acest proiect se axează pe crearea unei platforme web pentru managementul voluntarilor.' },
    { title: 'Proiectul C', summary: 'Sumar despre Proiectul C. Acest proiect este dedicat organizării evenimentelor și campaniilor de promovare.' },
    { title: 'Proiectul D', summary: 'Sumar despre Proiectul D. Acest proiect implică dezvoltarea unei aplicații de e-commerce.' },
    { title: 'Proiectul E', summary: 'Sumar despre Proiectul E. Acest proiect vizează crearea unei soluții de CRM.' },
    { title: 'Proiectul F', summary: 'Sumar despre Proiectul F. Acest proiect se concentrează pe integrarea unui sistem de plăți online.' }
  ];

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

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Previne selectarea paginilor invalide
    this.currentPage = page;
  }
}