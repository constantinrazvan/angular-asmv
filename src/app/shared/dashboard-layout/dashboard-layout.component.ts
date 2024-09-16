import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardNavComponent],
  template: `
    <app-dashboard-nav></app-dashboard-nav>
    <div class="dashboard-content">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class DashboardLayoutComponent {}
