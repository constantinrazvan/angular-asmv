import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatisticsService } from '../../core/services/statistics/statistics.service';
import { CommonModule } from '@angular/common';

interface Data {
  title: string;
  data: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  messages: number = 0;
  volunteers: number = 0;
  becomeVolunteers: number = 0;
  projects: number = 0;
  users: number = 0;

  statistics: Data[] = [];

  constructor(private service: StatisticsService) {}

  ngOnInit() {
    this.getMessages();
    this.getVolunteers();
    this.getBecomeVolunteers();
    this.getProjects();
    this.getUsers();
  }

  updateStatistics() {
    this.statistics = [
      { title: 'Mesaje', data: this.messages },
      { title: 'Voluntari', data: this.volunteers },
      { title: 'Cereri Voluntariat', data: this.becomeVolunteers },
      { title: 'Proiecte', data: this.projects },
      { title: 'Utilizatori', data: this.users },
    ];
  }

  getMessages() {
    this.service.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.updateStatistics();
      },
      error: (e) => console.error(e),
    });
  }

  getVolunteers() {
    this.service.getVolunteers().subscribe({
      next: (data) => {
        this.volunteers = data;
        this.updateStatistics();
      },
      error: (e) => console.error(e),
    });
  }

  getBecomeVolunteers() {
    this.service.getBecomeVolunteers().subscribe({
      next: (data) => {
        this.becomeVolunteers = data;
        this.updateStatistics();
      },
      error: (e) => console.error(e),
    });
  }

  getProjects() {
    this.service.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.updateStatistics();
      },
      error: (e) => console.error(e),
    });
  }

  getUsers() {
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.updateStatistics();
      },
      error: (e) => console.error(e),
    });
  }
}
