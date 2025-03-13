// src/app/store/todo.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addTask, completeTask, editTask,deleteTask } from './todo.action';;

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}



const initialState: Task[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [
    ...state,
    { id: state.length + 1, title: task.title, completed: false } // Correctly add the task
  ]),
  on(completeTask, (state, { id }) =>
    state.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  ),
  on(deleteTask, (state, { id }) => state.filter((task) => task.id !== id)),
  on(editTask, (state, { id, task }) =>
    state.map((t) => (t.id === id ? { ...t, ...task } : t))
  )
);


