import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { Project } from '../../core/models/Project';
import { ProjectService } from '../../core/services/project/service.service';

@Component({
  selector: 'app-projectdetail',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project = {
    id: 0,
    title: '',
    summary: '',
    content: '',
    userId: 0,
    image: ''
  };

  title = `ASMV - Proiect`;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService
  ) {}

  ngOnInit() {
    this.loadProject();
  }

  loadProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getProject(id).subscribe({
      next: (data: Project) => {
        this.project = {
          ...data,
          image: this.getImageUrl(data.image) 
        };
        console.log('Project:', this.project);
      },
      error: (error) => {
        console.error('Error fetching project', error);
      }
    });
  }
  

  setUpperCase() : void {
    this.upperCaseTitle = this.project.title.charAt(0).toUpperCase() + this.project.title.slice(1);
  }

  upperCaseTitle = '';

  getImageUrl(filePath: string): string {
    return filePath && filePath.startsWith('http') 
      ? filePath 
      : `https://localhost:7155/${filePath.replace('wwwroot/', '')}`;
  }
  
  

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '../../../assets/defaultImage.jpeg';
  }
}
