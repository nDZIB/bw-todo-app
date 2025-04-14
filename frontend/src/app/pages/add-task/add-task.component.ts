import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks/tasks.service';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  taskForm?: FormGroup;
  taskId = 0;
  errors: string[] = []

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
    this.taskForm?.markAllAsTouched()
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
        },
        error: (error: HttpErrorResponse) => {
          if(error.error.error) {
            this.errors = [error.error.error]
          } else if(error.error.errors) {
            this.errors = error.error.errors
          }
        }
      })

      this.subscriptions.push(subs)
    }
  }

  hasError(controlName: string, validation: string) {
    const control = this.taskForm?.get(controlName)
    return ((control?.dirty || control?.touched)) && (control.errors && control.errors[validation])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
