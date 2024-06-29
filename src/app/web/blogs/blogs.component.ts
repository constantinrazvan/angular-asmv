import { Component, OnInit } from '@angular/core';
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
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit{

  title = "Blogs";

  private readonly blogsService : BlogsService;

  constructor(blogsService : BlogsService) {
    this.blogsService = blogsService;
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  blogsList: any[] = [];

  private loadBlogs() {
    this.blogsService.getBlogs();
    this.blogsService.getBlogs().subscribe((blogs) => {
      this.blogsList = blogs;
    })
  }

  private loadBlog(id: number) {
    this.blogsService.getBlogById(id);
    this.blogsService.getBlogById(id).subscribe((blog) => {
     
    })
  }
}
