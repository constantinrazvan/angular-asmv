import { Routes } from '@angular/router';
import { HomeComponent } from './web/home/home.component';
import { ProjectsComponent } from './web/projects/projects.component';
import { ProjectDetailComponent } from './web/projects/project-detail/project-detail.component';
import { ContactComponent } from './web/contact/contact.component';
import { BecomeVolunteerComponent } from './web/become-volunteer/become-volunteer.component';
import { SupportusComponent } from './web/supportus/supportus.component';
import { MembersComponent } from './web/members/members.component';

import { LoginComponent } from './auth-dashboard/login/login.component';
import { RegisterComponent } from './auth-dashboard/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedinGuard } from './core/guards/loggedin.guard';
import { DashboardLayoutComponent } from './shared/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./web/home/home.component').then(m => m.HomeComponent), 
    title: 'ASMV - Acasa' 
  },
  {
    path: 'proiecte', 
    loadComponent: () => import('./web/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'ASMV - Proiecte'
  },
  {
    path: 'proiect/:id',
    loadComponent: () => import('./web/projects/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'ASMV - Proiect'
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./web/contact/contact.component').then(m => m.ContactComponent), 
    title: 'ASMV - Contact' 
  },
  { 
    path: 'haiInEchipa', 
    loadComponent: () => import('./web/become-volunteer/become-volunteer.component').then(m => m.BecomeVolunteerComponent), 
    title: 'ASMV - Hai in echipa' 
  },
  { 
    path: 'doneaza', 
    loadComponent: () => import('./web/supportus/supportus.component').then(m => m.SupportusComponent), 
    title: 'ASMV - Sponsorizeaza-ne!' 
  },
  { 
    path: 'echipa', 
    loadComponent: () => import('./web/members/members.component').then(m => m.MembersComponent), 
    title: 'ASMV - Membri' 
  },
  {
    path: 'autentificare', 
    loadComponent: () => import('./auth-dashboard/login/login.component').then(m => m.LoginComponent),
    title: 'ASMV - Autentificare', 
    canActivate: [loggedinGuard]
  }, 
  {
    path: 'inregistrare', 
    loadComponent: () => import('./auth-dashboard/register/register.component').then(m => m.RegisterComponent),
    title: 'ASMV - Inregistrare',
    canActivate: [loggedinGuard]
  },
  {
    path: 'politica-de-confidentialitate',
    loadComponent: () => import('./web/gdpr/gdpr.component').then(m => m.GdprComponent), 
    title: 'ASMV - Politica de confidentialitate'
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'statistici',
        loadComponent: () => import('./dashboard/statistics/statistics.component').then(m => m.StatisticsComponent),
        title: 'Statistici'
      },
      {
        path: 'postari',
        loadComponent: () => import('./dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Proiecte'
      },
      {
        path: 'mesaje',
        loadComponent: () => import('./dashboard/messages/messages.component').then(m => m.MessagesComponent),
        title: 'Mesaje'
      },
      {
        path: 'voluntari',
        loadComponent: () => import('./dashboard/volunteers/volunteers.component').then(m => m.VolunteersComponent), 
        title: 'Voluntari'
      },
      {
        path: 'cereri',
        loadComponent: () => import('./dashboard/requests/requests.component').then(m => m.RequestsComponent), 
        title: 'Cereri de Voluntariat'
      },
      {
        path: 'profil',
        loadComponent: () => import('./dashboard/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profil'
      },
      {
        path: '',
        redirectTo: 'statistici',
        pathMatch: 'full'
      }, 
      {
        path: 'proiect/nou',
        loadComponent: () => import('./dashboard/projects/add-project/add-project.component').then(m => m.AddProjectComponent),
        title: 'Nou proiect'
      },
      {
        path: 'proiect/edit/:id',
        loadComponent: () => import('./dashboard/projects/edit-project/edit-project.component').then(m => m.EditProjectComponent),
        title: 'Editeaza proiect'
      }, 
      {
        path: 'mesaje/:id', 
        loadComponent: () => import('./dashboard/messages/view-message/view-message.component').then(m => m.ViewMessageComponent), 
        title: 'Mesaj'
      }
    ]
  },  
  { path: '**', redirectTo: '' } // This should be the last route
];