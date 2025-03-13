// src/app/store/app.state.ts
import { Task } from './todo.reducer';

export interface AppState {
  tasks: Task[];
}
