import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/guard/auth.guard';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'pages',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
