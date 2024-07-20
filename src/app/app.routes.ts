import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './shared/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./web/home/home.component').then(m => m.HomeComponent), title: 'ASMV - Acasa' },
    { path: 'contact', loadComponent: () => import('./web/contact/contact.component').then(m => m.ContactComponent), title: 'ASMV - Contact' },
    { path: 'volunteers', loadComponent: () => import('./web/volunteers/volunteers.component').then(m => m.VolunteersComponent), title: 'ASMV - Voluntari' },
    { path: 'haiInEchipa', loadComponent: () => import('./web/become-volunteer/become-volunteer.component').then(m => m.BecomeVolunteerComponent), title: 'ASMV - Hai in echipa' },
    { path: 'blogs', loadComponent: () => import('./web/blogs/blogs.component').then(m => m.BlogsComponent), title: 'ASMV - Bloguri' },
    { path: 'blogs/:id', loadComponent: () => import('./web/blogdetail/blogdetail.component').then(m => m.BlogdetailComponent), title: 'ASMV - Blog' },
    { path: 'supportUs', loadComponent: () => import('./web/supportus/supportus.component').then(m => m.SupportusComponent), title: 'ASMV - Sponsorizeaza-ne!' },
    { path: 'proiect/:id', loadComponent: () => import('./web/projectdetail/projectdetail.component').then(m => m.ProjectDetailComponent), title: 'ASMV - Proiect' },
    { path: 'members', loadComponent: () => import('./web/members/members.component').then(m => m.MembersComponent), title: 'ASMV - Membri' },
    { path: 'proiecte', loadComponent: () => import('./web/projects/projects.component').then(m => m.ProjectsComponent), title: 'ASMV - Proiecte' },
    {
      path: 'dashboard',
      component: DashboardLayoutComponent,
      children: [
        {
          path: 'proiecte',
          loadComponent: () => import('./dashboard/projects/projects.component').then(m => m.ProjectsComponent),
          title: 'Dashboard - Proiecte'
        },
        {
          path: 'bloguri',
          loadComponent: () => import('./dashboard/blogs/blogs.component').then(m => m.BlogsComponent),
          title: 'Dashboard - Bloguri'
        },
        {
          path: 'cereri-voluntariat',
          loadComponent: () => import('./dashboard/requests/requests.component').then(m => m.RequestsComponent),
          title: 'Dashboard - Cereri voluntari'
        }, 
        {
          path: 'mesaje',
          loadComponent: () => import('./dashboard/messages/messages.component').then(m => m.MessagesComponent),
          title: 'Dashboard - Mesaje'
        },
      ]
    }
  ];
