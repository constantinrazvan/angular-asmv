import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { Volunteer } from '../../core/models/Volunteer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { VolunteersService } from '../../core/services/volunteers/volunteers.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, AfterViewInit {
  title = "ASMV - Membri";

  membersAdunareaGenerala: Volunteer[] = [];
  membersConsiliuDirectorial: Volunteer[] = [];
  memberVolunteers: Volunteer[] = [];
  isLoading = true;

  constructor(private service: VolunteersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element: any) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  getMembersByDepartment(departmentKey: string, targetArray: Volunteer[]): void {
    this.service.selectByDepartment(departmentKey).subscribe({
      next: (res: Volunteer[]) => {
        targetArray.length = 0;
        targetArray.push(...this.sortMembers(res)); // Sortăm membrii înainte de afișare
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(`Error fetching members for ${departmentKey}:`, error);
        this.isLoading = false;
      }
    });
  }

  getMembersAdunareaGenerala(): void {
    this.getMembersByDepartment("Adunarea Generala", this.membersAdunareaGenerala);
  }

  getMembersConsiliuDirectorial(): void {
    this.getMembersByDepartment("Consiliu Directorial", this.membersConsiliuDirectorial);
  }

  getMemberVolunteers(): void {
    this.getMembersByDepartment("Voluntari", this.memberVolunteers);
  }

  loadMembers(): void {
    this.service.getVolunteers().subscribe({
      next: (data: Volunteer[]) => {
        this.memberVolunteers = this.sortMembers(data);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Eroare la încărcarea voluntarilor:', err);
        this.isLoading = false;
      }
    });
  }

  private sortMembers(members: Volunteer[]): Volunteer[] {
    return members.sort((a, b) => {
      if (a.president && !b.president) return -1; // Președintele are prioritate
      if (!a.president && b.president) return 1;
      if (a.vicepresident && !b.vicepresident) return -1; // Vicepreședintele are a doua prioritate
      if (!a.vicepresident && b.vicepresident) return 1;
      return 0; // Restul păstrează ordinea
    });
  }
}
