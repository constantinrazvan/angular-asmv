import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/services/projectService/project.service';
import { CommonModule } from '@angular/common';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-projectdetail',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        this.projectService.getProjectById(+projectId).subscribe(project => {
          this.project = project;
        });
      } else {
        console.error('Project ID is missing');
      }
    });
  }
}
