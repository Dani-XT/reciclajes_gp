import { Routes } from '@angular/router';

import { Auth } from './auth';

export const routes: Routes = [
    {
        path: '',
        component: Auth
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password').then( m => m.ForgotPassword)
    }
];
