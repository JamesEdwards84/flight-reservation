import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    },
    {
        path: 'flight',
        loadComponent: () => import('./components/find-flights/find-flights').then(m => m.FindFlights),
        canActivate: [authGuard]
    },
    {
        path: 'display-flights',
        loadComponent: () => import('./components/display-flights/display-flights').then(m => m.DisplayFlights),
        canActivate: [authGuard]
    },
    {
        path: 'passenger-details/:id',
        loadComponent: () => import('./components/passenger-details/passenger-details').then(m => m.PassengerDetails),
        canActivate: [authGuard]
    },
    {
        path: 'confirm/:id',
        loadComponent: () => import('./components/confirm/confirm').then(m => m.Confirm),
        canActivate: [authGuard]
    }
];
