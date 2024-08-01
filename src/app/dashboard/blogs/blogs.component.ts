import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/Blog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  blogToDelete: Blog | null = null;
  showConfirmDeleteModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.$values)) {
          this.blogs = this.reversedBlogs(data.$values);
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

  reversedBlogs(data: Blog[]): Blog[] {
    return data.slice().reverse();
  }

  refreshData(): void {
    this.loadBlogs();
  }

  confirmDelete(blog: Blog): void {
    this.blogToDelete = blog;
    this.showConfirmDeleteModal = true;
  }

  deleteBlog(): void {
    if (this.blogToDelete) {
      const blogId = this.blogToDelete.id;
      this.blogService.deleteBlog(blogId).subscribe({
        next: () => {
          this.blogs = this.blogs.filter(blog => blog.id !== blogId);
          this.closeConfirmModal();
        },
        error: (error) => {
          console.log('Error deleting blog:', error);
        }
      });
    }
  }

  closeConfirmModal(): void {
    this.showConfirmDeleteModal = false;
    this.blogToDelete = null;
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
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
