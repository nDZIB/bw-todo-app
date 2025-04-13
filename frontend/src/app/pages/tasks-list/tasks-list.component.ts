import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks/tasks.service';
import { Page } from '../../models/page.mode';
import { TaskComponent } from '../../components/task/task.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
    private taskService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasksPage: Page<Task>) => {
        this.tasks = tasksPage.data
      }
    })
  }

  editTask({title, description, id}: Task) {
    this.router.navigate(['.', 'add'], {queryParams: {title, description, id}, relativeTo: this.activatedRoute})
  }

  
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id!==id)
      }
    })
  }
}
