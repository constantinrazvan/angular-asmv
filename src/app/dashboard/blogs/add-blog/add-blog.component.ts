import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../../core/services/blog/blog.service';
import { BlogDTO } from '../../../core/models/BlogDTO';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, AngularEditorModule],
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {

  blog: BlogDTO = { title: '', summary: '', content: '' };
  selectedImage: string | ArrayBuffer | null = null;
  error: string = '';

  constructor(private blogService: BlogService, private router: Router) { }

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

  addBlog(): void {
    if (!this.validator()) {
      this.error = 'Toate campurile sunt obligatorii!';
      return;
    } else {
      this.error = '';

      this.blogService.addBlog(this.blog, this.getUserIdFromToken()).subscribe({
        next: (data) => {
          console.log(data);
          window.alert('Blog adaugat cu succes!');
          this.router.navigate(['/dashboard/blogs']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeSelectedImage(): void {
    this.selectedImage = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
  }

  triggerFileInputClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  validator(): boolean {
    if (!this.blog.title || !this.blog.summary || !this.blog.content) {
      return false;
    }
    return true;
  }
}