// src/app/store/todo.selectors.ts
import { createSelector } from '@ngrx/store';
import { Task } from './todo.reducer';  
import { AppState } from './todo.state'; 

// Define the selector to select tasks from the state
export const selectTasks = createSelector(
  (state: AppState) => state.tasks,  
  (tasks) => tasks 
);

