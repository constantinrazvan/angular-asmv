import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects/projects.service';
import { Project } from '../../../core/models/Project';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService
  ) {}

  private id: number = 0;
  private subscription: Subscription | null = null;
  project: Project = {} as Project;

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(params => {
      console.log(params['id']);
      this.id = params['id'];
    });

    this.fetchData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchData(): void { 
    this.service.getOneProject(this.id).subscribe({
      next: (data: Project) => { 
        this.project = data;
      }, 
      error: (error: string | null) => {
        console.log(error);
      }
    })
  }
}