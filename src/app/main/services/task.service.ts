import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = environment.apiUrl + 'task/';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + 'create-task', task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + 'get-tasks');
  }

  getTask(id: any): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + 'get-task/' + id);
  }

  editTask(id: any, taskObj: any): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + 'update-task/' + id, taskObj);
  }

  deleteTask(id: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(this.apiUrl + 'delete-task/' + id);
  }
}
