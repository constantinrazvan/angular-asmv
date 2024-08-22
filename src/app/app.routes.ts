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
  { path: '**', redirectTo: '' } // Asigură-te că acesta este ultimul
];
