import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/Blog';
import { StripHtmlPipe } from '../../core/pipes/strip-html.pipe';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [WebFooterComponent, WebNavbarComponent, CommonModule, RouterModule, StripHtmlPipe],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, AfterViewInit {

  title = "ASMV - Bloguri";
  blogsList: Blog[] = [];

  constructor(
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngAfterViewInit() {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element: any) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        if (data && data.$values && Array.isArray(data.$values)) {
          this.blogsList = data.$values;
          console.log(this.blogsList); // Verifică ce conține blog.content
        } else {
          console.error('Data is not an array', data);
          this.blogsList = [];
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}