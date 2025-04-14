import { Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { authenticatedGuard } from './guards/authenticated/authenticated.guard';
import { unauthenticatedGuard } from './guards/unauthenticated/unauthenticated.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [authenticatedGuard],
        children: [
            {
                path: 'tasks',
                component: TasksListComponent
            },
            {
                path: 'tasks/add',
                component: AddTaskComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'tasks'
            }
        ]
    },
    {
        path: 'login',
        // canActivate: [unauthenticatedGuard],
        component: LoginComponent
    },
    {
        path: 'sign-up',
        canActivate: [unauthenticatedGuard],
        component: SignUpComponent
    }
];
