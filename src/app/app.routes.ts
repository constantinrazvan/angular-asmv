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
    path: 'schimba-parola', 
    loadComponent: () => import('./auth-dashboard/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'ASMV - Schimba parola',
  },
  {
    path: 'dashboard', 
    loadComponent : () => import('./shared/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'mesaje', loadComponent: () => import('./dashboard/manage-messages/manage-messages.component').then(m => m.ManageMessagesComponent), canActivate: [authGuard] },
      { path: 'statistici', loadComponent: () => import('./dashboard/statistics/statistics.component').then(m => m.StatisticsComponent), canActivate: [authGuard] },
      { path: 'proiecte', loadComponent: () => import('./dashboard/manage-projects/manage-projects.component').then(m => m.ManageProjectsComponent), canActivate: [authGuard] }, 
      { path: 'voluntari', loadComponent: () => import('./dashboard/manage-volunteers/manage-volunteers.component').then(m => m.ManageVolunteersComponent), canActivate: [authGuard] },
      { path: 'utilizatori', loadComponent: () => import('./dashboard/manage-users/manage-users.component').then(m => m.ManageUsersComponent), canActivate: [authGuard] }, 
      { path: 'cereri-voluntariat', loadComponent: () => import('./dashboard/manage-requests/manage-requests.component').then(m => m.ManageRequestsComponent), canActivate: [authGuard] },
      { path: 'profil', loadComponent: () => import('./dashboard/profile/profile.component').then(m => m.ProfileComponent) }, 
      
      { 
        path: 'vezi-mesaj/:id', 
        loadComponent: () => import('./dashboard/manage-messages/view-message/view-message.component').then(m => m.ViewMessageComponent),
        canActivate: [authGuard]
      },
      {
        path: 'vezi-cerere/:id', 
        loadComponent: () => import('./dashboard/manage-requests/view-request/view-request.component').then(m => m.ViewRequestComponent),
        canActivate: [authGuard]
      }, 
      {
        path: 'vezi-voluntar/:id', 
        loadComponent: () => import('./dashboard/manage-volunteers/view-volunteer/view-volunteer.component').then(m => m.ViewVolunteerComponent),
        canActivate: [authGuard]
      }, 
      {
        path: 'adauga-voluntar', 
        loadComponent: () => import('./dashboard/manage-volunteers/add-volunteer/add-volunteer.component').then(m => m.AddVolunteerComponent),
        canActivate: [authGuard]
      }, 
      {
        path: 'vezi-utilizator/:id', 
        loadComponent: () => import('./dashboard/manage-users/view-user/view-user.component').then(m => m.ViewUserComponent),
        canActivate: [authGuard]
      },     
      {
        path: 'utilizator-schimba-email/:id',
        loadComponent: () => import('./dashboard/profile/change-email/change-email.component').then(m => m.ChangeEmailComponent),
        canActivate: [authGuard]
      },
      {
        path: '', 
        loadComponent: () => import('./dashboard/statistics/statistics.component').then(m => m.StatisticsComponent),
        canActivate: [authGuard]
      },
      {
        path: 'vezi-proiect/:id', 
        loadComponent: () => import('./dashboard/manage-projects/view-project/view-project.component').then(m => m.ViewProjectComponent),
        canActivate: [authGuard]
      }, 
      {
        path: 'adauga-proiect', 
        loadComponent: () => import('./dashboard/manage-projects/add-project/add-project.component').then(m => m.AddProjectComponent),
        canActivate: [authGuard]
      },
    ]
  },
  { path: '**', redirectTo: '' } // This should be the last route
];