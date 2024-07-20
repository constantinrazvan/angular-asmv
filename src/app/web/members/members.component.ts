import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [WebNavbarComponent, WebFooterComponent, CommonModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, AfterViewInit {

  title = "ASMV - Membri";

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
    // Loading members logic goes here, if needed
  }

  membersActive: string[] = [
    "assets/voluntari-activi/voluntar1.jpg", 
    "assets/voluntari-activi/voluntar2.jpg",
    "assets/voluntari-activi/voluntar3.jpg",
    "assets/voluntari-activi/voluntar4.jpg",
  ]

  memberVolunteers: string[] = [
    "assets/voluntari-asmv/voluntar1.jpg",
    "assets/voluntari-asmv/voluntar2.jpg",
    "assets/voluntari-asmv/voluntar3.jpg",
    "assets/voluntari-asmv/voluntar4.jpg",
    "assets/voluntari-asmv/voluntar5.jpg",
    "assets/voluntari-asmv/voluntar6.jpg",
    "assets/voluntari-asmv/voluntar7.jpg",
    "assets/voluntari-asmv/voluntar8.jpg",
    "assets/voluntari-asmv/voluntar9.jpg",
    "assets/voluntari-asmv/voluntar10.jpg",
    "assets/voluntari-asmv/voluntar11.jpg",
    "assets/voluntari-asmv/voluntar12.jpg",
    "assets/voluntari-asmv/voluntar13.jpg",
    "assets/voluntari-asmv/voluntar14.jpg",
    "assets/voluntari-asmv/voluntar15.jpg",
  ]

}
