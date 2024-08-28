import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StatisticsService } from '../../core/services/statistics/statistics.service';
import { CommonModule } from '@angular/common';
import { Volunteer } from '../../core/models/Volunteer';
import { Project } from '../../core/models/Project';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface Data {
  title: string;
  data: number;
  icon: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginator],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  messages: number = 0;
  volunteers: number = 0;
  becomeVolunteers: number = 0;
  projects: number = 0;
  users: number = 0;

  statistics: Data[] = [];
  projectsStack: Project[] = [];
  volunteerStack: Volunteer[] = [];

  projectDisplayedColumns: string[] = ['title', 'summary'];
  volunteerDisplayedColumns: string[] = ['firstname', 'joined_date'];

  dataSourceProjects = new MatTableDataSource<Project>(this.projectsStack);
  dataSourceVolunteers = new MatTableDataSource<Volunteer>(this.volunteerStack);

  @ViewChild('projectPaginator') paginatorProject!: MatPaginator;
  @ViewChild('volunteerPaginator') paginatorVolunteer!: MatPaginator;

  constructor(
    private service: StatisticsService,
    private projectsService: ProjectsService,
    private volunteersService: VolunteersService
  ) {}

  ngOnInit() {
    this.getMessages();
    this.getVolunteers();
    this.getBecomeVolunteers();
    this.getProjects();
    this.getUsers();
    this.getVolunteersStack();
    this.getProjectsStack();
  }

  ngAfterViewInit() {
    this.dataSourceProjects.paginator = this.paginatorProject;
    this.dataSourceVolunteers.paginator = this.paginatorVolunteer;
  }

  updateStatistics() {
    this.statistics = [
      { title: 'Mesaje', data: this.messages, icon: 'email' },
      { title: 'Voluntari', data: this.volunteers, icon: 'group' },
      { title: 'Cereri Voluntariat', data: this.becomeVolunteers, icon: 'volunteer_activism' },
      { title: 'Proiecte', data: this.projects, icon: 'folder_open' },
      { title: 'Utilizatori', data: this.users, icon: 'people' },
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
    })
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

  getVolunteersStack() {
    this.volunteersService.getAll().subscribe({
      next: (data) => {
        const reversedVolunteerStack: Volunteer[] = [];
        for (let i = data.length - 1; i >= 0; i--) {
          reversedVolunteerStack.push(data[i]);
        }
        this.volunteerStack = reversedVolunteerStack;
        this.dataSourceVolunteers.data = this.volunteerStack;
      },
      error: (e) => console.error(e),
    });
  }
  
  getProjectsStack() {
    this.projectsService.getAllProjects().subscribe({
      next: (data) => {
        const reversedProjectStack: Project[] = [];
        for (let i = data.length - 1; i >= 0; i--) {
          reversedProjectStack.push(data[i]);
        }
        this.projectsStack = reversedProjectStack;
        this.dataSourceProjects.data = this.projectsStack;
      },
      error: (e) => console.error(e),
    });
  }    
}