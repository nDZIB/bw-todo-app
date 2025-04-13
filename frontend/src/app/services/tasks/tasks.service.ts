import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Page } from '../../models/page.mode';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly baseUrl = `${environment.baseUrl}/api/v1/tasks`
  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<Page<Task>>(`${this.baseUrl}`)
  }
}
