import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/Blog';
import { BlogDTO } from '../../core/models/BlogDTO';
import {jwtDecode} from 'jwt-decode'; // Fix the import here
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'], 
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  selectedBlog: Blog | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  newBlog: BlogDTO = { title: '', content: '' };
  showAddBlogForm: boolean = false;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.$values)) { // Adjust this line based on the actual structure
          this.blogs = data.$values; // Use the correct property for the array
        } else {
          console.error('Data is not an array', data);
          this.blogs = [];
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteBlog(index: number): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const blogId = this.blogs[startIndex + index].id;
    this.blogService.deleteBlog(blogId).subscribe({
      next: () => {
        this.blogs.splice(startIndex + index, 1);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  viewBlog(blog: Blog): void {
    this.selectedBlog = blog;
  }

  closeDialog(): void {
    this.selectedBlog = null;
  }

  get paginatedBlogs(): Blog[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.blogs.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.nameid) {
      throw new Error('Invalid token structure');
    }
    return +decodedToken.nameid; // Convert to number
  }

  toggleAddBlogForm(): void {
    this.showAddBlogForm = !this.showAddBlogForm;
  }

  addBlog(): void {
    try {
      const userId = this.getUserIdFromToken();
      this.blogService.addBlog(this.newBlog, userId).subscribe({
        next: (newBlog) => {
          if (this.blogs && Array.isArray(this.blogs)) {
            this.blogs.push(newBlog);
          } else {
            this.blogs = [newBlog];
          }
          this.newBlog = { title: '', content: '' }; // Reset form
          this.showAddBlogForm = false; // Hide form after submission
        },
        error: (error) => {
          console.log(error);
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}