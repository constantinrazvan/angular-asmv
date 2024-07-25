import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../core/services/volunteers/volunteers.service';
import { ProjectService } from '../../core/services/project/service.service';
import { BlogService } from '../../core/services/blog/blog.service';
import { ContactService } from '../../core/services/contact/contact.service';
import { BecomevolunteerService } from '../../core/services/becomeVolunteer/becomevolunteer.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  volunteers: number = 0; 
  projects: number = 0; 
  blogs: number = 0;
  messages: number = 0;
  requests: number = 0;
  users: number = 0;

  constructor(
    private volunteerService: VolunteerService,
    private projectService: ProjectService,
    private blogsService: BlogService, 
    private messagesService: ContactService,
    private requestsService: BecomevolunteerService,
    private usersService: UserService
  ){}

  token: string = localStorage.getItem('token') || '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadVolunteers();
    this.loadProjects();
    this.loadBlogs();
    this.loadMessages();
    this.loadRequests();
    this.loadUsers();
  }

  loadVolunteers(): void {
    this.volunteerService.getCount().subscribe({
      next: (data) => {
        this.volunteers = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadProjects(): void {
    this.projectService.getCount().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadBlogs(): void {
    this.blogsService.getCount().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadMessages(): void {
    this.messagesService.getCount().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadRequests(): void {
    this.requestsService.getCount().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadUsers(): void {
    this.usersService.getCount(this.token).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
