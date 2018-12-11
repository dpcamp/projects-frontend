import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service'
import * as cpt from './';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/jobs',
        pathMatch: 'full'
    },
    {
        path: 'jobs',
        component: cpt.JobsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: cpt.JobListComponent
                
            },
            {
                path: ':job_num',
                component: cpt.JobSingleComponent
            }
        ]
    },
    {
        path: 'invoices',
        component: cpt.InvoiceListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'requisitions',
        component: cpt.RequisitionListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: cpt.LoginComponent,
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
