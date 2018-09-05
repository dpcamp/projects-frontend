import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
