import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/Blog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, AngularEditorModule],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blog: Blog = {
    id: 0,
    title: '',
    content: '',
    summary: '',
    userId: 0
  };

  selectedImage: string | ArrayBuffer | null = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    translate: 'no',
    customClasses: [],
    toolbarHiddenButtons: [
      ['insertImage'],
      ['insertVideo'],
      ['insertTable'],
      ['insertHtmlCode'],
      ['html'],
      ['removeFormat'],
      ['insertTable'],
      ['insertTableRow'],
      ['insertTableColumn'],
      ['removeTable']
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    if (blogId) {
      this.blogService.getBlog(blogId).subscribe({
        next: (data: Blog) => {
          this.blog = data;
        },
        error: (error: string | any) => {
          console.error('Error fetching blog:', error);
        }
      });
    }
  }

  editBlog(): void {
    this.blogService.updateBlog(this.blog, this.blog.id).subscribe({
      next: (updatedBlog) => {
        console.log('Blog updated successfully:', updatedBlog);
        this.router.navigate(['/dashboard/bloguri']);
      },
      error: (error) => {
        console.error('Error updating blog:', error);
      }
    });
  }

  triggerFileInputClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target!.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeSelectedImage(): void {
    this.selectedImage = null;
  }
}