import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../task.service.service';
import { addTask, deleteTask, editTask, completeTask } from './todo.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

  
    @Injectable()
    export class TodoEffects {
      constructor(private actions$: Actions, private taskService: TaskService) {}
    
      addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addTask),
        mergeMap((action) =>
          this.taskService.addTask(action.task).pipe(
            map((task) => addTask({ task })), // Dispatch success action
            catchError(() => of({ type: '[Todo API] Task Add Failed' })) // Handle error
          )
        )
      )
    );
    
    }
    

  /*// Effect for deleting a task
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => ({ type: '[Todo API] Task Deleted', id: action.id })), // Dispatch success
          catchError(() => of({ type: '[Todo API] Task Delete Failed' })) // Handle error
        )
      )
    )
  );*/


