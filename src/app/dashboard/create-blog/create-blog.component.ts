import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, NgxFileDropModule } from 'ngx-file-drop';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    NgxFileDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatToolbarModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('noFileInput') noFileInput!: ElementRef;
  @ViewChild('previewTemplate') previewTemplate!: TemplateRef<any>;

  public files: NgxFileDropEntry[] = [];
  public headerImage: File | null = null;
  public headerImageUrl: string | ArrayBuffer | null = null;
  public galleryImages: Array<{file: File, url: string | ArrayBuffer | null}> = [];
  public today: string = '';
  public title: string = '';
  public content: string = '';
  public author: string = 'Autor curent';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    const date = new Date();
    this.today = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  }

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
            this.galleryImages.push({file, url: reader.result});
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

  public onHeaderFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.headerImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.headerImageUrl = reader.result;
      };
      if (this.headerImage) {
        reader.readAsDataURL(this.headerImage);
      }
    }
  }

  public onGalleryFileChange(event: any) {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.galleryImages.push({file, url: reader.result});
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

  public removeHeaderImage() {
    this.headerImage = null;
    this.headerImageUrl = null;
  }

  public removeGalleryImage(index: number) {
    this.galleryImages.splice(index, 1);
  }
}