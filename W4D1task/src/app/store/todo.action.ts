// src/app/store/todo.actions.ts
import { createAction, props } from '@ngrx/store';
import { Task } from './todo.reducer';
export const addTask = createAction(
  '[Todo] Add Task',
  props<{ task: Task }>()  // Change to accept the full task object
);

export const completeTask = createAction('[Todo] Complete Task', props<{ id: number }>());
export const editTask = createAction( '[Task] Edit Task', props<{ id: number; task: Task }>());
export const deleteTask = createAction('[Todo] Delete Task', props<{ id: number }>());

