import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '',
        loadComponent: async () => {
            return await import('./web/home/home.component').then(
                (m) => m.HomeComponent
            )
        },
    }, 
    {
        path: 'evenimente', 
        loadComponent: async () => {
            return await import('./web/events/events.component').then(
                (m) => m.EventsComponent
            )
        },
    }, 
    {
        path: 'contact', 
        loadComponent:() => {
            return import('./web/contact/contact.component').then(
                (m) => m.ContactComponent
            )
        },
    }, 
    {
        path: 'login', 
        loadComponent:() => {
            return import('./web/volunteers/volunteers.component').then(
                (m) => m.VolunteersComponent
            )
        },
    }, 
    {
        path: 'haiInEchipa', 
        loadComponent:() => {
            return import('./web/become-volunteer/become-volunteer.component').then(
                (m) => m.BecomeVolunteerComponent
            )
        },
    }, 
    {
        path: 'blogs',
        loadComponent:() => {
            return import('./web/blogs/blogs.component').then(
                (m) => m.BlogsComponent
            )
        },
    }, 
    {
        path: 'blogs/:id', 
        loadComponent:() => {
            return import('./web/blogdetail/blogdetail.component').then(
                (m) => m.BlogdetailComponent
            )
        },
    }, 
    {
        path: 'supportUs', 
        loadComponent:() => {
            return import('./web/supportus/supportus.component').then(
                (m) => m.SupportusComponent
            )
        }
    }, 
    {
        path: 'succes', 
        loadComponent: () => {
            return import('./web/result_pages/succes/succes.component').then(
                (m) => m.SuccesComponent
            )
        }
    },
    {
        path: 'error', 
        loadComponent: () => { 
            return import('./web/result_pages/error/error.component').then(
                (m) => m.ErrorComponent
            )
        }
    }
];
