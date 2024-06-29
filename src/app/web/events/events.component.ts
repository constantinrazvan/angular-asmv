import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseServiceService } from '../../core/services/courseService/course-service.service';
import { ProjectServiceService } from '../../core/services/projectService/project-service.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WebNavbarComponent,
    WebFooterComponent
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  activeTab: string = 'projects';
  coursesList: any[] = [];
  projectsList: any[] = [];
  selectedCourse: any; // Ensure this is defined if used

  constructor(
    private courseService: CourseServiceService,
    private projectService: ProjectServiceService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadProjects();
  }
  
  private loadData(): void {
    if(this.activeTab === 'projects') {
      this.loadProjects();
    } else if(this.activeTab === 'courses') {
      this.loadCourses();
    }
  }
  
  private loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => { 
      this.coursesList = courses;
    });
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => { // Assuming getProjects() returns all projects as an Observable
      this.projectsList = projects;
    });
  }

  private getCourse() : void {
    this.courseService.getCourseById(this.selectedCourse).subscribe(course => {
      
    })
  }
}
