import { Component } from '@angular/core';
import { ProjectService } from '../../../core/services/project/service.service';
import { Router, RouterModule } from '@angular/router';
import { ProjectDTO } from '../../../core/models/ProjectDTO';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AngularEditorModule, RouterModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  project : ProjectDTO = { title: '', summary: '', content: '', images: [] };
  selectedImage: string | ArrayBuffer | null = null;
  error: string = '';

  constructor(private projectService: ProjectService, private router: Router) { }

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

  addProject(): void {
    if (!this.validator()) {
      this.error = 'Toate campurile sunt obligatorii!';
      return;
    } else {
      this.error = '';

      this.projectService.addProject(this.project, this.getUserIdFromToken()).subscribe({
        next: (data) => {
          console.log(data);
        }, 
        error: (error) => {
          console.log(error);
        }
      })
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
    if (!this.project.title || !this.project.content || !this.project.summary) {
      return false;
    }
    return true;
  }
}