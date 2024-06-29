import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseServiceService } from '../../core/services/courseService/course-service.service';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-coursedetail',
  standalone: true,
  imports: [
    CommonModule, 
    WebNavbarComponent, 
    WebFooterComponent,
  ],
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  course: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseServiceService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.courseService.getCourseById(+courseId).subscribe(course => {
          this.course = course;
        });
      } else {
        console.error('Course ID is missing');
      }
    });
  }
}
