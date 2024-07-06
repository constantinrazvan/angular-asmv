import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { MembersService } from '../../core/services/membersService/members.service';
import { Member } from '../../core/interfaces/Member';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, AfterViewInit {
  membersDeOnoare: Member[] = [];
  membersAdunareGenerala: Member[] = [];
  membersConsiliuDirectorial: Member[] = [];
  membersVolunteers: Member[] = [];

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit() {
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

  loadMembers(): void {
    this.getMembersDeOnoare();
    this.getMembersAdunareGenerala();
    this.getMembersConsiliuDirectorial();
    this.getMembersVolunteers();
  }

  getMembersDeOnoare(): void {
    this.membersService.getMembersDeOnoare().subscribe({
      next: (res) => {
        this.membersDeOnoare = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMembersAdunareGenerala(): void {
    this.membersService.getMembersAdunareGenerala().subscribe({
      next: (res) => {
        this.membersAdunareGenerala = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMembersConsiliuDirectorial(): void {
    this.membersService.getMembersConsiliuDirectorial().subscribe({
      next: (res: Member[]) => {
        this.membersConsiliuDirectorial = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMembersVolunteers(): void {
    this.membersService.getMembersVolunteers().subscribe({
      next: (res) => {
        this.membersVolunteers = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
