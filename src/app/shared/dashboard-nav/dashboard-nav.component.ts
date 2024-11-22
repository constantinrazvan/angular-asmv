import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css'],
  imports: [RouterLink, CommonModule]
})
export class DashboardNavComponent implements OnInit {
  currentRoute: string = '';

  constructor(
    private router: Router, 
    private authService: AuthService 
  ) {}

  username: string = this.authService.getUserUsername();

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  logout() : void { 
    this.authService.logout();
    window.location.reload();
  }

  deleteNotification(id: number) {
    // Implement the logic to remove the notification by its id
    console.log(`Deleting notification with id: ${id}`);
    // Example: You might filter out the notification from an array of notifications
  }  
}