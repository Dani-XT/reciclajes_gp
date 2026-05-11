import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        title: 'Home - Reciclajes GP'
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes),
        title: 'Login - Reciclajes GP'
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
        title: 'forgot-password'
    },
    {
        path: 'about-us',
        loadComponent: () => import('./pages/about-us/about-us').then(m => m.AboutUs),
        title: 'Sobre nosotros - Reciclajes GP'
    }
];