import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  title = `ASMV - Proiect`;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
   
  }
}
