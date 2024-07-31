import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './shared/dashboard-layout/dashboard-layout.component';
import { StatusGuard } from './core/guards/status.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./web/home/home.component').then(m => m.HomeComponent), title: 'ASMV - Acasa' },
  { path: 'contact', loadComponent: () => import('./web/contact/contact.component').then(m => m.ContactComponent), title: 'ASMV - Contact' },
  { path: 'volunteers', loadComponent: () => import('./dashboard/volunteers/volunteers.component').then(m => m.VolunteersComponent), title: 'ASMV - Voluntari' },
  { path: 'haiInEchipa', loadComponent: () => import('./web/become-volunteer/become-volunteer.component').then(m => m.BecomeVolunteerComponent), title: 'ASMV - Hai in echipa' },
  { path: 'blogs', loadComponent: () => import('./web/blogs/blogs.component').then(m => m.BlogsComponent), title: 'ASMV - Bloguri' },
  { path: 'blogs/:id', loadComponent: () => import('./web/blogdetail/blogdetail.component').then(m => m.BlogdetailComponent), title: 'ASMV - Blog' },
  { path: 'supportUs', loadComponent: () => import('./web/supportus/supportus.component').then(m => m.SupportusComponent), title: 'ASMV - Sponsorizeaza-ne!' },
  { path: 'proiect/:id', loadComponent: () => import('./web/projectdetail/projectdetail.component').then(m => m.ProjectDetailComponent), title: 'ASMV - Proiect' },
  { path: 'members', loadComponent: () => import('./web/members/members.component').then(m => m.MembersComponent), title: 'ASMV - Membri' },
  { path: 'proiecte', loadComponent: () => import('./web/projects/projects.component').then(m => m.ProjectsComponent), title: 'ASMV - Proiecte' },
  { path: 'login', loadComponent: () => import("./dashboard/login/login.component").then(m => m.LoginComponent), title: 'Dashboard - Login' },
  { path: 'register', loadComponent: () => import("./dashboard/register/register.component").then(m => m.RegisterComponent), title: 'Dashboard - Register' },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'proiecte',
        loadComponent: () => import('./dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Dashboard - Proiecte',
        canActivate: [AuthGuard]
      },
      {
        path: 'bloguri',
        loadComponent: () => import('./dashboard/blogs/blogs.component').then(m => m.BlogsComponent),
        title: 'Dashboard - Bloguri',
        canActivate: [AuthGuard]
      },
      {
        path: 'cereri-voluntariat',
        loadComponent: () => import('./dashboard/requests/requests.component').then(m => m.RequestsComponent),
        title: 'Dashboard - Cereri voluntari',
        canActivate: [AuthGuard]
      },
      {
        path: 'mesaje',
        loadComponent: () => import('./dashboard/messages/messages.component').then(m => m.MessagesComponent),
        title: 'Dashboard - Mesaje',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import("./dashboard/profile/profile.component").then(m => m.ProfileComponent),
        title: 'Dashboard - Profil',
        canActivate: [AuthGuard]
      },
      {
        path: 'voluntari',
        loadComponent: () => import("./dashboard/volunteers/volunteers.component").then(m => m.VolunteersComponent),
        title: 'Dashboard - Voluntari',
        canActivate: [AuthGuard]
      },
      {
        path: 'utilizatori',
        loadComponent: () => import("./dashboard/users/users.component").then(m => m.UsersComponent),
        title: 'Dashboard - Utilizatori',
        canActivate: [AuthGuard, StatusGuard]
      },
      {
        path: 'forbidden',
        loadComponent: () => import("./dashboard/forbidden/forbidden.component").then(m => m.ForbiddenComponent),
        title: 'Dashboard - Forbidden',
        canActivate: [AuthGuard]
      }, 
      {
        path: 'statistici',
        loadComponent: () => import("./dashboard/statistics/statistics.component").then(m => m.StatisticsComponent),
        title: 'Dashboard - Statistici',
        canActivate: [AuthGuard]
      }, 
      {
        path: 'adauga-blog',
        loadComponent: () => import("./dashboard/blogs/add-blog/add-blog.component").then(m => m.AddBlogComponent),
        title: 'Dashboard - Adauga blog',
        canActivate: [AuthGuard]
      }, 
      {
        path: 'editeaza-blog/:id',
        loadComponent: () => import("./dashboard/blogs/edit-blog/edit-blog.component").then(m => m.EditBlogComponent),
        title: 'Dashboard - Editeaza blog',
        canActivate: [AuthGuard]
      }, 
      {
        path: 'adauga-proiect',
        loadComponent: () => import("./dashboard/projects/add-project/add-project.component").then(m => m.AddProjectComponent),
        title: 'Dashboard - Adauga proiect',
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', redirectTo: '' } // Optional: Handle undefined routes
];