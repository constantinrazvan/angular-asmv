import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {

  totalVoluntari: number = 150; // Exemplu de date
  totalProiecte: number = 45;   // Exemplu de date
  totalMesaje: number = 120;    // Exemplu de date
  totalUtilizatori: number = 75; // Exemplu de date

  // Exemple de date
  voluntariData = [
    { id: 1, numar: '123', nume: 'Ion Popescu' },
    { id: 2, numar: '456', nume: 'Maria Ionescu' },
    { id: 3, numar: '789', nume: 'Andrei Georgescu' },
    { id: 4, numar: '101', nume: 'Elena Radu' },
    { id: 5, numar: '202', nume: 'George Marin' },
    { id: 6, numar: '303', nume: 'Ana Popa' }
  ];

  mesajeData = [
    { id: 1, numar: '789', expeditor: 'Andrei Georgescu', mesaj: 'Mesaj important!' },
    { id: 2, numar: '101', expeditor: 'Elena Radu', mesaj: 'Întrebare despre proiect.' },
    { id: 3, numar: '202', expeditor: 'George Marin', mesaj: 'Solicitare de informații.' },
    { id: 4, numar: '303', expeditor: 'Ana Popa', mesaj: 'Feedback pozitiv.' },
    { id: 5, numar: '404', expeditor: 'Ioana Bălan', mesaj: 'Recomandare proiect.' },
    { id: 6, numar: '505', expeditor: 'Mihai Ionescu', mesaj: 'Întrebare despre eveniment.' }
  ];

  currentPageVoluntari = 1;
  currentPageMesaje = 1;
  rowsPerPage = 5;

  get totalVoluntariPages() {
    return Math.ceil(this.voluntariData.length / this.rowsPerPage);
  }

  get totalMesajePages() {
    return Math.ceil(this.mesajeData.length / this.rowsPerPage);
  }

  get paginatedVoluntari() {
    const start = (this.currentPageVoluntari - 1) * this.rowsPerPage;
    return this.voluntariData.slice(start, start + this.rowsPerPage);
  }

  get paginatedMesaje() {
    const start = (this.currentPageMesaje - 1) * this.rowsPerPage;
    return this.mesajeData.slice(start, start + this.rowsPerPage);
  }

  ngOnInit(): void { }

  changePageVoluntari(page: number) {
    this.currentPageVoluntari = page;
  }

  changePageMesaje(page: number) {
    this.currentPageMesaje = page;
  }
}