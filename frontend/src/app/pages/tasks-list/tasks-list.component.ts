import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks/tasks.service';
import { Page } from '../../models/page.mode';
import { TaskComponent } from '../../components/task/task.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskComponent, RouterModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  tasks: Task[] = []

  constructor(
    private taskService: TasksService
  ){}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasksPage: Page<Task>) => {
        this.tasks = tasksPage.data
      }
    })
  }
}
