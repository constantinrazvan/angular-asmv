import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Volunteer } from '../../../core/models/Volunteer';
import { VolunteersService } from '../../../core/services/volunteers/volunteers.service';

@Component({
  selector: 'app-view-volunteer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {
  volunteer: Volunteer = {} as Volunteer;
  id: number = 0;
  volunteerImage: string | null = null; // Pentru afișarea URL-ului imaginii
  selectedFile: File | null = null; // Proprietate separată pentru upload-ul fișierului
  imageDeleted: boolean = false; // Variabilă pentru ștergerea imaginii

  constructor(
    private service: VolunteersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  fetchUser(id: number): void {
    this.service.getOne(id).subscribe({
      next: (data: any) => {
        this.volunteer = data;

        // Parsarea URL-ului imaginii din răspuns
        if (data.volunteerImage && data.volunteerImage.url) {
          this.volunteerImage = data.volunteerImage.url; // Atribuire URL imagine
        } else {
          this.volunteerImage = null; // Nicio imagine
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.fetchUser(this.id);
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.imageDeleted) {
      // Trimite un câmp gol pentru imagine
      formData.append('volunteerImage', '');
    }

    // Adaugă restul datelor voluntarului în formData
    formData.append('firstname', this.volunteer.firstname);
    formData.append('lastname', this.volunteer.lastname);
    formData.append('email', this.volunteer.email);
    formData.append('phone', this.volunteer.phone);
    formData.append('city', this.volunteer.city);
    formData.append('status', this.volunteer.status);
    formData.append('joinedDate', this.volunteer.joinedDate);

    this.service.updateVolunteer(this.id, formData).subscribe({
      next: () => {
        console.log("Updated!");
        this.router.navigate(['/dashboard/voluntari']);
      },
      error: (err) => {
        console.log(err);
        alert("Ceva nu a mers corect! Incercati mai tarziu!");
      }
    });
  }

  onDelete(): void {
    this.service.deleteVolunteer(this.volunteer.id!).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        alert("Ceva nu a mers bine!");
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageDeleted = false; // Resetăm ștergerea imaginii
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.volunteerImage = e.target.result; // Afișare imagine selectată
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage(): void {
    this.volunteerImage = null; // Șterge imaginea din preview
    this.selectedFile = null; // Resetează fișierul selectat
    this.imageDeleted = true; // Marcăm imaginea ca ștearsă
  }
}