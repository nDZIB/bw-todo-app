import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()

  deleteTask() {
    const confirmed = confirm('Are you sure you want to delete this task?')
    if (confirmed) {
      this.delete.next(this.task)
    }
  }
  editTask() {
    this.edit.next(this.task)
  }
}
