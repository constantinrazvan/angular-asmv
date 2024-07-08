import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '',
        loadComponent: async () => {
            return await import('./web/home/home.component').then(
                (m) => m.HomeComponent
            )
        },
        title: 'ASMV - Acasa'
    }, 
    {
        path: 'contact', 
        loadComponent:() => {
            return import('./web/contact/contact.component').then(
                (m) => m.ContactComponent
            )
        }, 
        title: 'ASMV - Contact'
    }, 
    {
        path: 'volunteers', 
        loadComponent:() => {
            return import('./web/volunteers/volunteers.component').then(
                (m) => m.VolunteersComponent
            )
        },
        title: 'ASMV - Voluntari'
    }, 
    {
        path: 'haiInEchipa', 
        loadComponent:() => {
            return import('./web/become-volunteer/become-volunteer.component').then(
                (m) => m.BecomeVolunteerComponent
            )
        },
        title: 'ASMV - Hai in echipa'
    }, 
    {
        path: 'blogs',
        loadComponent:() => {
            return import('./web/blogs/blogs.component').then(
                (m) => m.BlogsComponent
            )
        },
        title: 'ASMV - Bloguri'
    }, 
    {
        path: 'blogs/:id', 
        loadComponent:() => {
            return import('./web/blogdetail/blogdetail.component').then(
                (m) => m.BlogdetailComponent
            )
        },
        title: 'ASMV - Blog'
    }, 
    {
        path: 'supportUs', 
        loadComponent:() => {
            return import('./web/supportus/supportus.component').then(
                (m) => m.SupportusComponent
            )
        },
        title: 'ASMV - Sponsorizeaza-ne!'
    }, 
    {
        path: 'succes', 
        loadComponent: () => {
            return import('./web/result_pages/succes/succes.component').then(
                (m) => m.SuccesComponent
            )
        }, 
        title: 'ASMV - Succes'
    },
    {
        path: 'error', 
        loadComponent: () => { 
            return import('./web/result_pages/error/error.component').then(
                (m) => m.ErrorComponent
            )
        }, 
        title: 'ASMV - Eroare'
    }, 
    {
        path: 'blogs-management',
        loadComponent: () => {
            return import('./dashboard/blogs-management/blogs-management.component').then(
                (m) => m.BlogsManagementComponent
            )
        },
        // canActivate : [AuthGuard],
        title: 'ASMV - Gestionare bloguri'
    },
    {
        path: 'proiecte',
        loadComponent: () => {
            return import('./web/projects/projects.component').then(
                (m) => m.ProjectsComponent
            )
        },
        // canActivate : [AuthGuard], 
        title: 'ASMV - Proiecte'
    }, 
    {
        path: 'newsletter-management',
        loadComponent:() => {
            return import('./dashboard/newsletter-management/newsletter-management.component').then(
                (m) => m.NewsletterManagementComponent
            )
        },
        // canActivate : [AuthGuard],
        title: 'ASMV - Gestionare newsletter'
    },
    {
        path: 'contact-management', 
        loadComponent: () => {
            return import('./dashboard/contact-management/contact-management.component').then(
                (m) => m.ContactManagementComponent
            )
        },
        // canActivate : [AuthGuard], 
        title: 'ASMV - Gestionare contacte'
    }, 
    {
        path: 'events-management', 
        loadComponent: () => {
            return import('./dashboard/events-management/events-management.component').then(
                (m) => m.EventsManagementComponent
            )
        },
        // canActivate : [AuthGuard], 
        title: 'ASMV - Gestionare evenimente'
    }, 
    {
        path: 'volunteers-management', 
        loadComponent: () => {
            return import('./dashboard/volunteers-management/volunteers-management.component').then(
                (m) => m.VolunteersManagementComponent
            )
        },
        // canActivate : [AuthGuard], 
        title: 'ASMV - Gestionare voluntari'
    }, 
    {
        path: 'login',
        loadComponent : () => {
            return import('./dashboard/login/login.component').then(
                (m) => m.LoginComponent
            )
        },
        title: 'ASMV - Login'
    }, 
    {
        path: 'register',
        loadComponent : () => {
            return import('./dashboard/register/register.component').then(
                (m) => m.RegisterComponent
            )
        },
        title: 'ASMV - Register'
    }, 
    {
        path: 'proiect/:id',
        loadComponent : () => {
            return import('./web/projectdetail/projectdetail.component').then(
                (m) => m.ProjectDetailComponent
            )
        },
        title: 'ASMV - Proiect'
    }, 
    {
        path: 'members', 
        loadComponent : () => { 
            return import("./web/members/members.component").then( 
                (m) => m.MembersComponent
            )
        }, 
        title: 'ASMV - Membri'
    }
];
