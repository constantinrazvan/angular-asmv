import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, NgxFileDropModule } from 'ngx-file-drop';
import { Router } from '@angular/router';
import { ProjectService } from '../../core/services/projectService/project.service';
@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    NgxFileDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('noFileInput') noFileInput!: ElementRef;
  @ViewChild('previewTemplate') previewTemplate!: TemplateRef<any>;

  public files: NgxFileDropEntry[] = [];
  public galleryImages: Array<{ file: File, url: string | ArrayBuffer | null }> = [];
  public title: string = '';
  public content: string = '';
  public summary: string = '';

  constructor(public dialog: MatDialog, private projectService: ProjectService, private router: Router) {}

  ngOnInit() {}

  public openPreview() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    this.dialog.open(this.previewTemplate, dialogConfig);
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.galleryImages.push({ file, url: reader.result });
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  public fileOver(event: Event) {
    console.log(event);
  }

  public fileLeave(event: Event) {
    console.log(event);
  }

  public onGalleryFileChange(event: any) {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.galleryImages.push({ file, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  public triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  public triggerNoFileInput() {
    this.noFileInput.nativeElement.click();
  }

  public removeGalleryImage(index: number) {
    this.galleryImages.splice(index, 1);
  }

  public submitForm() {
    const project = {
      title: this.title,
      content: this.content,
      summary: this.summary,
      images: this.galleryImages.map(img => img.file)
    };
    this.projectService.addProject(project).subscribe({
      next: response => {
        console.log('Project added successfully', response);
        this.router.navigate(['/projects']);
      },
      error: err => {
        console.error('Error adding project', err);
      }
    });
  }
}
