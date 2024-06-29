import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-navbar',
  standalone: true,
  imports: [],
  templateUrl: './web-navbar.component.html',
  styleUrl: './web-navbar.component.css'
})
export class WebNavbarComponent implements OnInit {

  constructor() { }

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
  }
}
