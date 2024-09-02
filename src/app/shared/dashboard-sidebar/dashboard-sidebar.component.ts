import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit, OnDestroy {

  constructor(
    private service: AuthService,
    private router: Router
  ){}

  opened = true;
  username: string = '';
  private refreshIntervalId: any;

  ngOnInit() {
    this.getName();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  getName() {
    const user: string = this.service.getUserUsername();
    this.username = user;
  }

  startAutoRefresh() {
    this.refreshIntervalId = setInterval(() => {
      this.getName();
    }, 5000); // Calls getName() every 5 seconds
  }

  stopAutoRefresh() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/autentificare']);
  }
}
