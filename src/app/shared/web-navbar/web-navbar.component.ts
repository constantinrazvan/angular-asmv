import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-navbar.component.html',
  styleUrl: './web-navbar.component.css'
})
export class WebNavbarComponent implements OnInit {

  constructor() { }

  scrolled = false;

  activeRoute = window.location.pathname;

  ngOnInit() {
    switch(this.activeRoute) {
      case '/':
        this.activeRoute = '/';
        break;
      case '/evenimente':
        this.activeRoute = '/evenimente';
        break;
      case '/blogs':
        this.activeRoute = '/blogs';
        break;
      case '/contact':
        this.activeRoute = '/contact';
        break;
    }

    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.checkScroll();
  }

  checkScroll() {
    this.scrolled = window.scrollY > 50; // Adjust this value as needed
  }

  
}
