import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { Volunteer } from '../../core/models/Volunteer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.css'
})
export class VolunteersComponent implements OnInit {

  constructor(
    private service: VolunteersService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.fetchData();
  }

  fetchData(): void {
    this.service.getAll().subscribe({
      next: (data: Volunteer[]) => {
        console.log('Data retrieved:');
        console.log(JSON.stringify(data, null, 2));
        this.volunteers = data.reverse();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  refresh(): void { 
    this.fetchData();
    window.location.reload();
  }
  
  volunteers : Volunteer[] = [];

  itemsPerPage = 5;
  currentPage = 1;

  get totalItems() {
    return this.volunteers.length;
  }

  get paginatedVolunteers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.volunteers.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }


  onDelete(id : number) {
    if(confirm("Esti sigur ca vrei sa stergi acest voluntar?")) {
      this.service.deleteVolunteer(id).subscribe({
        next: (res) => { 
          console.log(res);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}