import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  taskId = 0;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required])
    })

    this.activatedRoute.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        this.taskId = +(params.get('id') || '0')

        this.taskForm?.patchValue({
          title: params.get('title'),
          description: params.get('description')
        })
      }
    })
  }

  saveTask() {
    if (this.taskForm?.valid) {
      let apiCall: Observable<any>;
      if (!this.taskId) {
        apiCall = this.taskService.addTask(this.taskForm?.value)
      } else {
        apiCall = this.taskService.editTask(this.taskId, this.taskForm?.value)
      }

      const subs = apiCall.subscribe({
        next: (response: Task) => {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        }
      })

      this.subscriptions.push(subs)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
