import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/authService/auth.service';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  selector: 'app-blog-management',
  templateUrl: './blogs-management.component.html',
  styleUrls: ['./blogs-management.component.css']
})
export class BlogsManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'author', 'actions'];
  blogData = [
    { title: 'First Blog', description: 'This is the first blog description', author: 'John Doe', createdAt: '2024-07-08' },
    { title: 'Second Blog', description: 'This is the second blog description', author: 'Jane Doe', createdAt: '2024-07-08' },
    { title: 'Third Blog', description: 'This is the third blog description', author: 'Alice Smith', createdAt: '2024-07-09' },
    { title: 'Fourth Blog', description: 'This is the fourth blog description', author: 'Bob Brown', createdAt: '2024-07-10' },
    { title: 'Fifth Blog', description: 'This is the fifth blog description', author: 'Charlie Davis', createdAt: '2024-07-11' },
    { title: 'Sixth Blog', description: 'This is the sixth blog description', author: 'Dana Evans', createdAt: '2024-07-12' },
    { title: 'Seventh Blog', description: 'This is the seventh blog description', author: 'Eve Foster', createdAt: '2024-07-13' },
    { title: 'Eighth Blog', description: 'This is the eighth blog description', author: 'Frank Green', createdAt: '2024-07-14' },
    { title: 'Ninth Blog', description: 'This is the ninth blog description', author: 'Grace Hill', createdAt: '2024-07-15' },
    { title: 'Tenth Blog', description: 'This is the tenth blog description', author: 'Henry Jackson', createdAt: '2024-07-16' },
    { title: 'Eleventh Blog', description: 'This is the eleventh blog description', author: 'Ivy King', createdAt: '2024-07-17' },
    { title: 'Twelfth Blog', description: 'This is the twelfth blog description', author: 'Jack Lee', createdAt: '2024-07-18' },
    { title: 'Thirteenth Blog', description: 'This is the thirteenth blog description', author: 'Kara Martin', createdAt: '2024-07-19' },
    { title: 'Fourteenth Blog', description: 'This is the fourteenth blog description', author: 'Liam Nelson', createdAt: '2024-07-20' },
    { title: 'Fifteenth Blog', description: 'This is the fifteenth blog description', author: 'Mia Owens', createdAt: '2024-07-21' },
    { title: 'Sixteenth Blog', description: 'This is the sixteenth blog description', author: 'Nate Perez', createdAt: '2024-07-22' },
    { title: 'Seventeenth Blog', description: 'This is the seventeenth blog description', author: 'Olivia Quinn', createdAt: '2024-07-23' },
    { title: 'Eighteenth Blog', description: 'This is the eighteenth blog description', author: 'Paul Roberts', createdAt: '2024-07-24' },
    { title: 'Nineteenth Blog', description: 'This is the nineteenth blog description', author: 'Rachel Scott', createdAt: '2024-07-25' },
    { title: 'Twentieth Blog', description: 'This is the twentieth blog description', author: 'Sam Taylor', createdAt: '2024-07-26' },
  ];
  
  blogDataSource = new MatTableDataSource(this.blogData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog!: TemplateRef<any>;

  blog = { title: '', description: '', content: '', createdAt: '', author: '' };
  isEditMode = false;
  editedIndex!: number;

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  username: string | null  = this.authService.getUser();

  ngOnInit() {
    this.blogDataSource.data = this.blogData;
  }

  ngAfterViewInit() {
    this.blogDataSource.paginator = this.paginator;
    this.blogDataSource.sort = this.sort;
  }

  openAddBlogDialog() {
    this.isEditMode = false;
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.blog = { title: '', description: '', content: '', createdAt: dateStr, author: '' };
    this.dialog.open(this.dialogTemplate);
  }

  editBlog(blog: any) {
    this.isEditMode = true;
    this.blog = { ...blog };
    this.editedIndex = this.blogData.findIndex(b => b === blog);
    this.dialog.open(this.dialogTemplate);
  }

  saveBlog() {
    if (this.isEditMode) {
      this.blogData[this.editedIndex] = this.blog;
    } else {
      this.blogData.push(this.blog);
    }
    this.blogDataSource.data = [...this.blogData];
    this.dialog.closeAll();
  }

  confirmDeleteBlog(blog: any) {
    const dialogRef = this.dialog.open(this.confirmDeleteDialog, {
      data: blog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteBlog(blog);
      }
    });
  }

  deleteBlog(blog: any) {
    const index = this.blogData.findIndex(b => b === blog);
    if (index >= 0) {
      this.blogData.splice(index, 1);
      this.blogDataSource.data = [...this.blogData];
    }
  }
}
