import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from './store/todo.reducer';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private apiUrl = 'http://localhost:5134/api/Task'; // Microservice API
  
  constructor(private http: HttpClient) {}

  // Fetch all tasks from backend
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => {
        console.error('Error adding task:', error);
        return throwError(error);
      })
    );
  }
  

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
