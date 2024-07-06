import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { BlogsService } from '../../core/services/blogsService/blogs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [WebFooterComponent, WebNavbarComponent, CommonModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, AfterViewInit {

  title = "Blogs";

  private readonly blogsService: BlogsService;

  constructor(blogsService: BlogsService) {
    this.blogsService = blogsService;
  }

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

  blogsList: any[] = [];

  private loadBlogs() {
    this.blogsService.getBlogs().subscribe((blogs) => {
      this.blogsList = blogs;
      // Trigger onScroll to handle initial elements already in view
      this.onScroll();
    });
  }

  private loadBlog(id: number) {
    this.blogsService.getBlogById(id).subscribe((blog) => {
      // Logic to handle individual blog loading can be added here
    });
  }
}
