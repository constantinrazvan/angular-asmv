import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogdetail',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './blogdetail.component.html',
  styleUrl: './blogdetail.component.css'
})
export class BlogdetailComponent implements OnInit{

  title = "ASMV - Blog";

  blog: any;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  
    
  }

}
