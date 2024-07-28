import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/Blog';
import { BlogDTO } from '../../core/models/BlogDTO';
import { jwtDecode } from 'jwt-decode'; 
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
  blogToDelete: Blog | null = null;
  currentBlog: Blog = { id: 0, title: '', content: '', userId: 0 };
  showAddBlogForm: boolean = false;
  showConfirmDeleteModal: boolean = false;
  isEditing: boolean = false;
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

  toggleAddBlogForm(): void {
    this.showAddBlogForm = !this.showAddBlogForm;
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

  viewBlog(blog: Blog): void {
    this.selectedBlog = blog;
  }

  closeDialog(): void {
    this.selectedBlog = null;
  }

  openAddBlogModal(): void {
    this.currentBlog = { id: 0, title: '', content: '', userId: 0 };
    this.isEditing = false;
    this.showAddBlogForm = true;
  }

  editBlog(blog: Blog): void {
    this.currentBlog = { id: blog.id, title: blog.title, content: blog.content, userId: blog.userId };
    this.isEditing = true;
    this.showAddBlogForm = true;
  }

  closeAddBlogModal(): void {
    this.showAddBlogForm = false;
  }

  saveBlog(): void {
    try {
      const userId = this.getUserIdFromToken();
      if (this.isEditing) {
        this.blogService.updateBlog(this.currentBlog, this.currentBlog.id).subscribe({
          next: (updatedBlog) => {
            this.blogs = this.blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
            this.closeAddBlogModal();
          },
          error: (error) => {
            console.log('Error updating blog:', error);
          }
        });
      } else {
        this.blogService.addBlog(this.currentBlog, userId).subscribe({
          next: (newBlog) => {
            this.blogs.unshift(newBlog);
            this.closeAddBlogModal();
          },
          error: (error) => {
            console.log('Error adding blog:', error);
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
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

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken.nameid) {
      throw new Error('Invalid token structure');
    }
    return +decodedToken.nameid;
  }
}
