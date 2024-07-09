import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./web/home/home.component').then(m => m.HomeComponent), title: 'ASMV - Acasa' },
    { path: 'contact', loadComponent: () => import('./web/contact/contact.component').then(m => m.ContactComponent), title: 'ASMV - Contact' },
    { path: 'volunteers', loadComponent: () => import('./web/volunteers/volunteers.component').then(m => m.VolunteersComponent), title: 'ASMV - Voluntari' },
    { path: 'haiInEchipa', loadComponent: () => import('./web/become-volunteer/become-volunteer.component').then(m => m.BecomeVolunteerComponent), title: 'ASMV - Hai in echipa' },
    { path: 'blogs', loadComponent: () => import('./web/blogs/blogs.component').then(m => m.BlogsComponent), title: 'ASMV - Bloguri' },
    { path: 'blogs/:id', loadComponent: () => import('./web/blogdetail/blogdetail.component').then(m => m.BlogdetailComponent), title: 'ASMV - Blog' },
    { path: 'supportUs', loadComponent: () => import('./web/supportus/supportus.component').then(m => m.SupportusComponent), title: 'ASMV - Sponsorizeaza-ne!' },
    { path: 'succes', loadComponent: () => import('./web/result_pages/succes/succes.component').then(m => m.SuccesComponent), title: 'ASMV - Succes' },
    { path: 'error', loadComponent: () => import('./web/result_pages/error/error.component').then(m => m.ErrorComponent), title: 'ASMV - Eroare' },
    { path: 'proiecte', loadComponent: () => import('./web/projects/projects.component').then(m => m.ProjectsComponent), title: 'ASMV - Proiecte' },
    { path: 'login', loadComponent: () => import('./dashboard/login/login.component').then(m => m.LoginComponent), title: 'ASMV - Login' },
    { path: 'register', loadComponent: () => import('./dashboard/register/register.component').then(m => m.RegisterComponent), title: 'ASMV - Register' },
    { path: 'proiect/:id', loadComponent: () => import('./web/projectdetail/projectdetail.component').then(m => m.ProjectDetailComponent), title: 'ASMV - Proiect' },
    { path: 'members', loadComponent: () => import('./web/members/members.component').then(m => m.MembersComponent), title: 'ASMV - Membri' },
    {
      path: 'dashboard',
      component: DashboardLayoutComponent,
      children: [
        {
          path: 'panou-control',
          loadComponent: () => import('./dashboard/controlpanel/controlpanel.component').then(m => m.ControlpanelComponent),
          title: 'Panou de control',
          // canActivate: [AuthGuard]
        },
        {
          path: 'projects-management',
          loadComponent: () => import('./dashboard/events-management/events-management.component').then(m => m.EventsManagementComponent),
          title: 'Proiecte',
          // canActivate: [AuthGuard]
        },
        {
          path: 'blogs-management',
          loadComponent: () => import('./dashboard/blogs-management/blogs-management.component').then(m => m.BlogsManagementComponent),
          title: 'Bloguri',
          // canActivate: [AuthGuard]
        },
        {
          path: 'messages-management',
          loadComponent: () => import('./dashboard/contact-management/contact-management.component').then(m => m.ContactManagementComponent),
          title: 'Contact',
          // canActivate: [AuthGuard]
        },
        {
          path: 'newsletter-management',
          loadComponent: () => import('./dashboard/newsletter-management/newsletter-management.component').then(m => m.NewsletterManagementComponent),
          title: 'Newsletter',
          // canActivate: [AuthGuard]
        },
        {
          path: 'volunteers-management',
          loadComponent: () => import('./dashboard/volunteers-management/volunteers-management.component').then(m => m.VolunteersManagementComponent),
          title: 'Voluntari',
          // canActivate: [AuthGuard]
        },
        {
          path: 'cereri-voluntariat',
          loadComponent: () => import('./dashboard/volunteer-requests/volunteer-requests.component').then(m => m.VolunteerRequestsComponent),
          title: 'Cereri Voluntari',
          // canActivate: [AuthGuard]
        },
        {
          path: 'profile',
          loadComponent: () => import('./dashboard/profile-user/profile-user.component').then(m => m.ProfileUserComponent),
          // canActivate: [AuthGuard]
        },
        {
          path: 'add-blog',
          loadComponent: () => import('./dashboard/create-blog/create-blog.component').then(m => m.CreateBlogComponent),
          // canActivate: [AuthGuard]
        },
        {
          path: 'add-project',
          loadComponent: () => import('./dashboard/create-project/create-project.component').then(m => m.CreateProjectComponent),
          title: 'Adaugă Proiect', 
          // canActivate: [AuthGuard]
        }, 
        {
            path: 'add-volunteer',
            loadComponent : () => import('./dashboard/create-volunteer/create-volunteer.component').then(m => m.CreateVolunteerComponent), 
            title: 'Adaugă Voluntar', 
            // canActivate: [AuthGuard]
        }
      ]
    }
  ];
