import { Routes } from '@angular/router';
import { Error404Component } from './shared/components/error-404/error-404.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../app/views/app-layout/app-layout-routing').then((m) => m.APP_LAYOUT_ROUTES)
    },
    {
        path: 'error',
        component: Error404Component,
    },
    { path: '**', redirectTo: 'error' }
];
