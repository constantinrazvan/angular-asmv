import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/Blog';

@Component({
  selector: 'app-blogdetail',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {

  title = "ASMV - Blog";
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loadBlog(+blogId);
    }
  }

  loadBlog(id: number): void {
    this.blogService.getBlog(id).subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (error) => {
        console.error('Error fetching blog', error);
      }
    });
  }
}
