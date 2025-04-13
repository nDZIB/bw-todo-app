import { Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TasksListComponent
    },
    {
        path: 'tasks/add',
        component: AddTaskComponent
    },
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
