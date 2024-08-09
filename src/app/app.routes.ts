import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { StatusGuard } from './core/guards/status.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./web/home/home.component').then(m => m.HomeComponent), title: 'ASMV - Acasa' },
  { path: 'contact', loadComponent: () => import('./web/contact/contact.component').then(m => m.ContactComponent), title: 'ASMV - Contact' },
  { path: 'volunteers', loadComponent: () => import('./dashboard/volunteers/volunteers.component').then(m => m.VolunteersComponent), title: 'ASMV - Voluntari' },
  { path: 'haiInEchipa', loadComponent: () => import('./web/become-volunteer/become-volunteer.component').then(m => m.BecomeVolunteerComponent), title: 'ASMV - Hai in echipa' },
  { path: 'supportUs', loadComponent: () => import('./web/supportus/supportus.component').then(m => m.SupportusComponent), title: 'ASMV - Sponsorizeaza-ne!' },
  { path: 'proiect', loadComponent: () => import('./web/projectdetail/projectdetail.component').then(m => m.ProjectDetailComponent), title: 'ASMV - Proiect' },
  { path: 'members', loadComponent: () => import('./web/members/members.component').then(m => m.MembersComponent), title: 'ASMV - Membri' },
  { path: 'proiecte', loadComponent: () => import('./web/projects/projects.component').then(m => m.ProjectsComponent), title: 'ASMV - Proiecte' },
  // {
  //   path: 'dashboard',
  //   component: DashboardLayoutComponent,
  //   children: [
  //   ]
  // },
  { path: '**', redirectTo: '' } // Optional: Handle undefined routes
];