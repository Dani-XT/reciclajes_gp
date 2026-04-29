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
        title: 'home'
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes),
        title: 'auth'
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
        title: 'forgot-password'
    }
];