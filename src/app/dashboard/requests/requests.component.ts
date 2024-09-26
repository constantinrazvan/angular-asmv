import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BecomeVolunteer } from '../../core/models/BecomeVolunteer';
import { RequestsService } from '../../core/services/requests/requests.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit{
  requests : BecomeVolunteer[] = [];

  constructor(
    private service: RequestsService,
    private router: Router
  ){}

  itemsPerPage = 5;
  currentPage = 1;

  get totalItems() {
    return this.requests.length;
  }

  get paginatedVolunteers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.requests.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getRequests().subscribe({
      next: (data: any) => {
        console.log("Data retrieved");
        console.log(JSON.stringify(data, null, 2));
  
        // Check if $values is an array and reverse it
        if (data && Array.isArray(data.$values)) {
          this.requests = data.$values.reverse(); // Access the array and reverse it
        } else {
          console.log('Data does not contain a valid $values array');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }  

  refresh(): void { 
    this.fetchData();
    window.location.reload();
  }

  markAsRead(id: number) {
    this.service.markAsRead(id).subscribe({
      next: (res) => {
        console.log("Data retrived:")
        console.log(JSON.stringify(res, null, 2));
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }  

  onDelete(id: number): void { 
    if(confirm("Esti sigur ca vrei sa stergi cererea?")) {
      this.service.deleteRequest(id).subscribe({
        next: () => { 
          console.log("Cerere stearsa cu succes!");
          window.location.reload();
        }, 
        error: (err) => { 
          console.log(err);
          alert("Ceva nu a mers!");
        }
      })
    }
  }
}