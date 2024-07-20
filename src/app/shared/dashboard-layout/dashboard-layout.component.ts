import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardSidebarComponent],
  template: `
    <app-dashboard-sidebar>
      <router-outlet></router-outlet>
    </app-dashboard-sidebar>
  `,
})
export class DashboardLayoutComponent {}