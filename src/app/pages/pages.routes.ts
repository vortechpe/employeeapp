import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { AuthGuard } from '../guard/auth.guard';

export default [
    { path: 'crud', component: Crud , canActivate: [AuthGuard]},
] as Routes;
