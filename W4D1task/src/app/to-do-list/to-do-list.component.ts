import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../store/todo.reducer';
import { selectTasks } from '../store/ todo.selectors';
import { addTask, completeTask, editTask, deleteTask } from '../store/todo.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface AppState {
  tasks: Task[];
}

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  todoForm: FormGroup;
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  editingTaskId: number | null = null;  // Track the task being edited

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
    });
    this.tasks$ = store.select('tasks');
  }

  /*ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
  }*/

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
    this.store.dispatch({ type: '[Todo] Load Tasks' }); // Load tasks from microservice
  }
  


  onSubmit() {
    if (this.todoForm.valid) {
      const taskName = this.todoForm.value.task;
  
      if (this.editingTaskId !== null) {
        const updatedTask: Task = {
          id: this.editingTaskId,
          title: taskName,
          completed: false, // Assuming you want to keep the "completed" status as false for edited tasks
        };
        this.store.dispatch(editTask({ id: this.editingTaskId, task: updatedTask }));
        this.editingTaskId = null;
      } else {
        const newTask: Task = {
          id: 0, // Let the API handle the id assignment
          title: taskName,
          completed: false, // Default to not completed
        };
        this.store.dispatch(addTask({ task: newTask }));
      

      }}}
  

  onEditTask(id: number, taskName: string) {
    this.editingTaskId = id;
    this.todoForm.setValue({ title: taskName });  // Set form value to the task being edited
  }

  onCompleteTask(id: number) {
    this.store.dispatch(completeTask({ id }));
  }

  onDeleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}

