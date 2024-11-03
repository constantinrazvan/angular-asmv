import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../profile/profile.component';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  zileleSaptamanii = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
  numeLuna: string;
  anulCurent: number;
  lunaCurenta: number;
  zileLunaCurenta: any[] = [];
  emptyDays: any[] = [];

  activitateNoua = { nume: '', coordonator: '', persoane: [] as string[], data: '' };
  utilizatori: any[] = [];
  persoanaTemporara: string | null = null;
  modalDeschis: boolean = false;
  activitateEditata: any = null;

  constructor(private userService: UsersService) {
    const dataCurenta = new Date();
    this.lunaCurenta = dataCurenta.getMonth();
    this.anulCurent = dataCurenta.getFullYear();
    this.numeLuna = this.getNumeLuna(this.lunaCurenta);
  }

  ngOnInit(): void {
    this.genereazaCalendar();
    this.obtineUtilizatori();
  }

  getNumeLuna(luna: number): string {
    const luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    return luni[luna];
  }

  genereazaCalendar(): void {
    const primaZiLuna = new Date(this.anulCurent, this.lunaCurenta, 1);
    const ultimaZiLuna = new Date(this.anulCurent, this.lunaCurenta + 1, 0);

    const startDay = (primaZiLuna.getDay() + 6) % 7;
    this.emptyDays = Array(startDay).fill(null);

    this.zileLunaCurenta = Array.from({ length: ultimaZiLuna.getDate() }, (_, i) => ({
      numarZi: i + 1,
      activitati: []
    }));
  }

  schimbaLuna(increment: number): void {
    this.lunaCurenta += increment;
    if (this.lunaCurenta > 11) {
      this.lunaCurenta = 0;
      this.anulCurent++;
    } else if (this.lunaCurenta < 0) {
      this.lunaCurenta = 11;
      this.anulCurent--;
    }
    this.numeLuna = this.getNumeLuna(this.lunaCurenta);
    this.genereazaCalendar();
  }

  obtineUtilizatori(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.utilizatori = data.map(user => ({
          id: user.id,
          numeComplet: `${user.firstname} ${user.lastname}`
        }));
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  adaugaPersoana(): void {
    if (this.persoanaTemporara && !this.activitateNoua.persoane.includes(this.persoanaTemporara)) {
      this.activitateNoua.persoane.push(this.persoanaTemporara);
      this.persoanaTemporara = null;
    }
  }

  stergePersoana(index: number): void {
    this.activitateNoua.persoane.splice(index, 1);
  }

  deschideFormularAdaugare(): void {
    this.modalDeschis = true;
    this.activitateNoua = { nume: '', coordonator: '', persoane: [], data: '' };
    this.activitateEditata = null;
  }

  editeazaActivitate(zi: any, activitate: any): void {
    this.modalDeschis = true;
    this.activitateNoua = { ...activitate };
    this.activitateEditata = activitate;
  }

  inchideFormular(): void {
    this.modalDeschis = false;
    this.activitateNoua = { nume: '', coordonator: '', persoane: [], data: '' };
    this.activitateEditata = null;
  }

  salveazaActivitate(): void {
    const dataActivitate = new Date(this.activitateNoua.data);
    const zi = this.zileLunaCurenta.find(z => z.numarZi === dataActivitate.getDate());

    if (this.activitateEditata) {
      Object.assign(this.activitateEditata, this.activitateNoua);
    } else if (zi) {
      zi.activitati.push({ ...this.activitateNoua });
    }

    this.inchideFormular();
  }

  stergeActivitate(): void {
    if (this.activitateEditata && this.zileLunaCurenta) {
      const zi = this.zileLunaCurenta.find(z => z.activitati.includes(this.activitateEditata));
      if (zi) {
        const index = zi.activitati.indexOf(this.activitateEditata);
        if (index > -1) {
          zi.activitati.splice(index, 1);
        }
      }
      this.inchideFormular();
    }
  }
}