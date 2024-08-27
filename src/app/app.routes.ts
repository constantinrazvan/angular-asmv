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
    path: 'proiecte/:id',
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
    title: 'ASMV - Autentificare'
  }, 
  {
    path: 'inregistrare', 
    loadComponent: () => import('./auth-dashboard/register/register.component').then(m => m.RegisterComponent),
    title: 'ASMV - Inregistrare'
  },
  {
    path: 'dashboard', 
    loadComponent : () => import('./shared/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { path: 'mesaje', loadComponent: () => import('./dashboard/manage-messages/manage-messages.component').then(m => m.ManageMessagesComponent) },
      { path: 'statistici', loadComponent: () => import('./dashboard/statistics/statistics.component').then(m => m.StatisticsComponent) },
      { path: 'proiecte', loadComponent: () => import('./dashboard/manage-projects/manage-projects.component').then(m => m.ManageProjectsComponent) }, 
      { path: 'voluntari', loadComponent: () => import('./dashboard/manage-volunteers/manage-volunteers.component').then(m => m.ManageVolunteersComponent) },
      { path: 'utilizatori', loadComponent: () => import('./dashboard/manage-users/manage-users.component').then(m => m.ManageUsersComponent) }, 
      { path: 'cereri-voluntariat', loadComponent: () => import('./dashboard/manage-requests/manage-requests.component').then(m => m.ManageRequestsComponent) },
      { path: 'profil', loadComponent: () => import('./dashboard/profile/profile.component').then(m => m.ProfileComponent) }, 
      { 
        path: 'vezi-mesaj/:id', 
        loadComponent: () => import('./dashboard/manage-messages/view-message/view-message.component').then(m => m.ViewMessageComponent) 
      },
      {
        path: 'vezi-cerere/:id', 
        loadComponent: () => import('./dashboard/manage-requests/view-request/view-request.component').then(m => m.ViewRequestComponent)
      }, 
      {
        path: 'vezi-voluntar/:id', 
        loadComponent: () => import('./dashboard/manage-volunteers/view-volunteer/view-volunteer.component').then(m => m.ViewVolunteerComponent)
      }, 
      {
        path: 'adauga-voluntar', 
        loadComponent: () => import('./dashboard/manage-volunteers/add-volunteer/add-volunteer.component').then(m => m.AddVolunteerComponent)
      }, 
      {
        path: 'vezi-utilizator/:id', 
        loadComponent: () => import('./dashboard/manage-users/view-user/view-user.component').then(m => m.ViewUserComponent)
      }, 
      {
        path: 'schimba-parola/:id',
        loadComponent: () => import('./dashboard/manage-users/change-password/change-password.component').then(m => m.ChangePasswordComponent)
      }, 
      {
        path: 'schimba-email/:id', 
        loadComponent: () => import('./dashboard/manage-users/change-email/change-email.component').then(m => m.ChangeEmailComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' } // This should be the last route
];