import { Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TasksListComponent
    },
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
