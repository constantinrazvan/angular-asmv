import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Blog {
  id: number;
  title: string;
  body: string;
  author: string;
  imgHeader: string;
  date: string;
}

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  blogs: Blog[] = [
    { id: 1, title: 'First Blog', body: 'This is the body of the first blog.', author: 'John Doe', imgHeader: 'assets/img1.jpg', date: '2023-07-19' },
    { id: 2, title: 'Second Blog', body: 'This is the body of the second blog.', author: 'Jane Smith', imgHeader: 'assets/img2.jpg', date: '2023-07-18' }
  ];

  selectedBlog: Blog | null = null;

  deleteBlog(index: number): void {
    this.blogs.splice(index, 1);
  }

  viewBlog(blog: Blog): void {
    this.selectedBlog = blog;
  }

  closeDialog(): void {
    this.selectedBlog = null;
  }
}
