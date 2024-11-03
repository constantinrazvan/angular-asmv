import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../core/models/Message';
import { Volunteer } from '../../core/models/Volunteer';
// import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { MessagesService } from '../../core/services/messages/messages.service';
import { StatisticsService } from '../../core/services/statistics/statistics.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(
    // private volunteerService: VolunteersService,
    private messageService: MessagesService, 
    private statisticsService: StatisticsService
  ){}

  totalVoluntari: number = 0;
  totalProiecte: number = 0;  
  totalMesaje: number = 0;   
  totalUtilizatori: number = 0;
  totalCereri: number = 0;

  voluntariData: Volunteer[] = [];
  mesajeData: Message[] = [];

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

  ngOnInit(): void {
    this.fetchMessages();
    // this.fetchVolunteers();

    this.fetchStatisticsBecomeVolunteer();
    this.fetchStatisticsMessages();
    this.fetchStatisticsProjects();
    this.fetchStatisticsUsers();
    this.fetchStatisticsVolunteers();
  }

  changePageVoluntari(page: number) {
    this.currentPageVoluntari = page;
  }

  changePageMesaje(page: number) {
    this.currentPageMesaje = page;
  }

  // fetchVolunteers(): void {
  //   this.volunteerService.getAll().subscribe({
  //     next: (data: any) => { 
  //       console.log("Volunteers data retrieved:", JSON.stringify(data, null, 2));

  //       // If data has $values property, use it
  //       this.voluntariData = Array.isArray(data.$values) ? data.$values : data;
  //     },
  //     error: (err : any)  => { 
  //       console.log("Error fetching volunteers:", err);
  //     }
  //   });
  // }

  fetchMessages(): void { 
    this.messageService.getAllMessages().subscribe({
      next: (data: any) => { 
        console.log("Messages data retrieved:", JSON.stringify(data, null, 2));

        // If data has $values property, use it
        this.mesajeData = Array.isArray(data.$values) ? data.$values : data;
      },
      error: (err) => { 
        console.log("Error fetching messages:", err);
      }
    });
  }

  fetchStatisticsVolunteers(): void { 
    this.statisticsService.getVolunteers().subscribe({
      next: (data: number) => { 
        console.log("Total volunteers count:", data);
        this.totalVoluntari = data;
      }, 
      error: (err) => { 
        console.log("Error fetching volunteer statistics:", err);
      }
    });
  }

  fetchStatisticsUsers(): void { 
    this.statisticsService.getUsers().subscribe({
      next: (data: number) => { 
        console.log("Total users count:", data);
        this.totalUtilizatori = data;
      }, 
      error: (err) => { 
        console.log("Error fetching user statistics:", err);
      }
    });
  }

  fetchStatisticsMessages(): void {
    this.statisticsService.getMessages().subscribe({
      next: (data: number) => { 
        console.log("Total messages count:", data);
        this.totalMesaje = data;
      }, 
      error: (err) => { 
        console.log("Error fetching message statistics:", err);
      }
    });
  }

  fetchStatisticsProjects(): void {
    this.statisticsService.getProjects().subscribe({
      next: (data: number) => { 
        console.log("Total projects count:", data);
        this.totalProiecte = data;
      }, 
      error: (err) => { 
        console.log("Error fetching project statistics:", err);
      }
    });
  }

  fetchStatisticsBecomeVolunteer(): void {
    this.statisticsService.getBecomeVolunteers().subscribe({
      next: (data: number) => { 
        console.log("Total 'Become a Volunteer' requests count:", data);
        this.totalCereri = data;
      }, 
      error: (err) => { 
        console.log("Error fetching 'Become a Volunteer' statistics:", err);
      }
    });
  }
}