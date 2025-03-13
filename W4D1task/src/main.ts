
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { ToDoListComponent } from './app/to-do-list/to-do-list.component';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './app/store/todo.reducer';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { TodoEffects } from './app/store/todo.effects';

bootstrapApplication(ToDoListComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(CommonModule, ReactiveFormsModule),
    provideStore({ tasks: todoReducer }) 
  ]
}).catch(err => console.error(err));
