import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatSort,
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    FormsModule, 
    MatButtonModule
  ],
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.css']
})
export class EventsManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'content', 'actions'];
  projectData = [
    { title: 'Proiect 1', content: 'Conținutul proiectului 1' },
    { title: 'Proiect 2', content: 'Conținutul proiectului 2' },
    // Add more data as needed
  ];

  projectDataSource = new MatTableDataSource(this.projectData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog!: TemplateRef<any>;

  project = { title: '', content: '' };
  isEditMode = false;
  editedIndex!: number;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.projectDataSource.data = this.projectData;
  }

  ngAfterViewInit() {
    this.projectDataSource.paginator = this.paginator;
    this.projectDataSource.sort = this.sort;
  }

  openAddProjectDialog() {
    this.isEditMode = false;
    this.project = { title: '', content: '' };
    this.dialog.open(this.dialogTemplate);
  }

  editProject(project: any) {
    this.isEditMode = true;
    this.project = { ...project };
    this.editedIndex = this.projectData.findIndex(p => p === project);
    this.dialog.open(this.dialogTemplate);
  }

  saveProject() {
    if (this.isEditMode) {
      this.projectData[this.editedIndex] = this.project;
    } else {
      this.projectData.push(this.project);
    }
    this.projectDataSource.data = [...this.projectData];
    this.dialog.closeAll();
  }

  confirmDeleteProject(project: any) {
    const dialogRef = this.dialog.open(this.confirmDeleteDialog, {
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(project);
      }
    });
  }

  deleteProject(project: any) {
    const index = this.projectData.findIndex(p => p === project);
    if (index >= 0) {
      this.projectData.splice(index, 1);
      this.projectDataSource.data = [...this.projectData];
    }
  }
}
