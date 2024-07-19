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
import { BlogsService } from '../../core/services/blogsService/blogs.service';
import { AuthService } from '../../core/services/authService/auth.service';
import { Observable, of, forkJoin } from 'rxjs';

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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('noFileInput') noFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('previewTemplate') previewTemplate!: TemplateRef<any>;

  public files: NgxFileDropEntry[] = [];
  public headerImage: File | null = null;
  public headerImageUrl: string | ArrayBuffer | null = null;
  public galleryImages: Array<{file: File, url: string | ArrayBuffer | null}> = [];
  public today: string = '';
  public title: string = '';
  public content: string = '';
  public author: string = '';
  public error: string = '';

  constructor(public dialog: MatDialog, private blogsService: BlogsService, private authService: AuthService) {}

  ngOnInit() {
    const date = new Date();
    this.today = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    this.author = this.authService.getUser() || 'Unknown';
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
          reader.onload = () => {
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

  public onHeaderFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.headerImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.headerImageUrl = reader.result;
      };
      reader.readAsDataURL(this.headerImage);
    }
  }

  public onGalleryFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = input.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.galleryImages.push({file, url: reader.result});
        };
        reader.readAsDataURL(file);
      }
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

  public uploadHeaderImage(): Observable<any> {
    if (!this.headerImage) {
      return of(null);
    }
    const formData = new FormData();
    formData.append('file', this.headerImage);
    return this.blogsService.uploadHeaderImage(formData);
  }

  public uploadGalleryImages(): Observable<any>[] {
    const uploadObservables: Observable<any>[] = [];
    for (const img of this.galleryImages) {
      const formData = new FormData();
      formData.append('file', img.file);
      uploadObservables.push(this.blogsService.uploadGalleryImage(formData));
    }
    return uploadObservables;
  }

  public submitBlog() {
    this.uploadHeaderImage().subscribe({
      next: headerResponse => {
        const headerImageUrl = headerResponse?.Url;
        const galleryImageUploads = this.uploadGalleryImages();

        forkJoin(galleryImageUploads).subscribe({
          next: galleryResponses => {
            const galleryImageUrls = galleryResponses.map(res => res.Url);
            const newBlog = {
              title: this.title,
              content: this.content,
              author: this.author,
              date: this.today,
              headerImageUrl: headerImageUrl,
              galleryImageUrls: galleryImageUrls
            };

            this.blogsService.addBlog(newBlog).subscribe({
              next: response => {
                console.log('Blog created successfully', response);
                // Optionally, navigate to another page or clear the form
                this.title = '';
                this.content = '';
                this.author = '';
                this.headerImage = null;
                this.headerImageUrl = null;
                this.galleryImages = [];
              },
              error: err => {
                console.error('Blog creation failed', err);
                // Handle error (show error message to user)
                this.error = err.message;
              }
            });
          },
          error: err => {
            console.error('Gallery image upload failed', err);
          }
        });
      },
      error: err => {
        console.error('Header image upload failed', err);
      }
    });
  }
}