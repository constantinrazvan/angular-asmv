import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../core/services/blogsService/blogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogdetail',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './blogdetail.component.html',
  styleUrl: './blogdetail.component.css'
})
export class BlogdetailComponent implements OnInit{
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      if (id) {
        this.blogService.getBlogById(id).subscribe(blog => {
          this.blog = blog;
        });
      } else {
        console.log('Blog ID is missing!');
      }
    });
    
  }

}
