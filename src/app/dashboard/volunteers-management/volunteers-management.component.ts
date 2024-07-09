import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatDialogModule,
    MatIconModule,
    MatSelectModule, 
    RouterLink
  ],
  templateUrl: './volunteers-management.component.html',
  styleUrl: './volunteers-management.component.css'
})
export class VolunteersManagementComponent implements OnInit {
  displayedColumns: string[] = ['nume', 'prenume', 'facultate', 'joinDate', 'statusMembru', 'varsta', 'localitate', 'actions'];
  memberData = [
    { nume: 'Popescu', prenume: 'Ion', facultate: 'Facultatea de Matematică', joinDate: '2024-07-08', statusMembru: 'Membru Adunarea Generală', varsta: 25, localitate: 'București' },
    { nume: 'Ionescu', prenume: 'Maria', facultate: 'Facultatea de Litere', joinDate: '2023-05-12', statusMembru: 'Consiliu Directorial', varsta: 30, localitate: 'Craiova' },
    { nume: 'Dumitru', prenume: 'Andrei', facultate: 'Facultatea de Fizică', joinDate: '2022-11-20', statusMembru: 'de Onoare', varsta: 35, localitate: 'Constanța' },
    { nume: 'Georgescu', prenume: 'Elena', facultate: 'Facultatea de Chimie', joinDate: '2021-03-15', statusMembru: 'Voluntar', varsta: 22, localitate: 'București' },
    { nume: 'Marinescu', prenume: 'Ana', facultate: 'Facultatea de Biologie', joinDate: '2020-06-25', statusMembru: 'Membru Adunarea Generală', varsta: 28, localitate: 'Constanța' },
    { nume: 'Stan', prenume: 'Mihai', facultate: 'Facultatea de Informatică', joinDate: '2019-08-30', statusMembru: 'Consiliu Directorial', varsta: 32, localitate: 'Brașov' },
    { nume: 'Iliescu', prenume: 'Radu', facultate: 'Facultatea de Geografie', joinDate: '2022-01-10', statusMembru: 'de Onoare', varsta: 40, localitate: 'Constanța' },
    { nume: 'Voinea', prenume: 'Laura', facultate: 'Facultatea de Psihologie', joinDate: '2023-09-05', statusMembru: 'Voluntar', varsta: 27, localitate: 'Oradea' },
    { nume: 'Neagu', prenume: 'Cristina', facultate: 'Facultatea de Drept', joinDate: '2024-04-12', statusMembru: 'Membru Adunarea Generală', varsta: 26, localitate: 'București' },
    { nume: 'Fercu', prenume: 'Paul', facultate: 'Facultatea de Economie', joinDate: '2022-07-19', statusMembru: 'Consiliu Directorial', varsta: 29, localitate: 'Craiova' },
    { nume: 'Mazilu', prenume: 'Oana', facultate: 'Facultatea de Sociologie', joinDate: '2021-10-14', statusMembru: 'de Onoare', varsta: 34, localitate: 'Ploiești' },
    { nume: 'Morar', prenume: 'Adrian', facultate: 'Facultatea de Medicină', joinDate: '2020-02-25', statusMembru: 'Voluntar', varsta: 31, localitate: 'București' },
    { nume: 'Preda', prenume: 'Ioana', facultate: 'Facultatea de Jurnalism', joinDate: '2019-05-03', statusMembru: 'Membru Adunarea Generală', varsta: 24, localitate: 'Ploiești' },
    { nume: 'Badea', prenume: 'Alina', facultate: 'Facultatea de Arte', joinDate: '2023-12-22', statusMembru: 'Consiliu Directorial', varsta: 37, localitate: 'Târgu Constanța' },
    { nume: 'Nistor', prenume: 'Florin', facultate: 'Facultatea de Istorie', joinDate: '2022-08-18', statusMembru: 'de Onoare', varsta: 33, localitate: 'Ploiești' },
    { nume: 'Sandu', prenume: 'Monica', facultate: 'Facultatea de Administrație Publică', joinDate: '2021-01-29', statusMembru: 'Voluntar', varsta: 23, localitate: 'Brăila' },
    { nume: 'Lupu', prenume: 'Gabriel', facultate: 'Facultatea de Arhitectură', joinDate: '2020-09-07', statusMembru: 'Membru Adunarea Generală', varsta: 36, localitate: 'Buzău' },
    { nume: 'Ungureanu', prenume: 'Carmen', facultate: 'Facultatea de Educație Fizică', joinDate: '2019-03-21', statusMembru: 'Consiliu Directorial', varsta: 27, localitate: 'Vaslui' },
    { nume: 'Petrescu', prenume: 'Dan', facultate: 'Facultatea de Filosofie', joinDate: '2023-06-11', statusMembru: 'de Onoare', varsta: 41, localitate: 'Bistrița' },
    { nume: 'Manole', prenume: 'Vlad', facultate: 'Facultatea de Teologie', joinDate: '2022-04-17', statusMembru: 'Voluntar', varsta: 28, localitate: 'Focșani' },
];

  memberDataSource = new MatTableDataSource(this.memberData);
  filteredDataSource = new MatTableDataSource(this.memberData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  member = { nume: '', prenume: '', facultate: '', joinDate: '', statusMembru: '', varsta: 0, localitate: '' };
  isEditMode = false;
  editedIndex!: number;

  ageFilter: number | null = null;
  statusFilter: string | null = null;
  localityFilter: string | null = null;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredDataSource.data = this.memberData;
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
    this.filteredDataSource.sort = this.sort;
  }

  openAddMemberDialog() {
    this.isEditMode = false;
    this.member = { nume: '', prenume: '', facultate: '', joinDate: '', statusMembru: '', varsta: 0, localitate: '' };
    this.dialog.open(this.dialogTemplate);
  }

  editMember(member: any) {
    this.isEditMode = true;
    this.member = { ...member };
    this.editedIndex = this.memberData.findIndex(m => m === member);
    this.dialog.open(this.dialogTemplate);
  }

  saveMember() {
    if (this.isEditMode) {
      this.memberData[this.editedIndex] = this.member;
    } else {
      this.memberData.push(this.member);
    }
    this.applyFilter();
    this.dialog.closeAll();
  }

  applyFilter() {
    let filteredData = this.memberData;

    if (this.ageFilter !== null) {
      filteredData = filteredData.filter(member => member.varsta === this.ageFilter);
    }

    if (this.statusFilter) {
      filteredData = filteredData.filter(member => member.statusMembru === this.statusFilter);
    }

    if (this.localityFilter) {
      filteredData = filteredData.filter(member => member.localitate.toLowerCase().includes(this.localityFilter!.toLowerCase()));
    }

    this.filteredDataSource.data = filteredData;
  }

  toggleCititStatus(member: any) {
    // Implement toggle status logic here
  }
}