import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/Project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project : Project = {} as Project;

  constructor() { }

  ngOnInit(): void {
  }

  

}
