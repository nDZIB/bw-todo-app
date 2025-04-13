import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  taskForm?: FormGroup;

  constructor(private taskService: TasksService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required])
    })
  }

  saveTask() {
    if (this.taskForm?.valid) {
      this.taskService.addTask(this.taskForm?.value).subscribe({
        next: (response: Task) => {
          this.router.navigate(['..'], {relativeTo: this.activatedRoute})
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
