import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from 'src/app/shared/interface/todo.interface';
import { TodoService } from './todo.service';
import * as TodosActions from '../../todo-list/store/todo-list.action';
import { AppState } from 'src/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private store: Store<AppState>
  ) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('http://localhost:3000/todo')
      .pipe(
        tap((todos: Todo[]) =>
          this.store.dispatch(TodosActions.fetchTodosSucces({ todos }))
        )
      );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`http://localhost:3000/todo/${id}`);
  }

  postTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http
      .post<Todo>('http://localhost:3000/todo', todo)
      .pipe(tap((todo) => this.todoService.addTodo(todo)));
  }
  deleteTodo(id: number): Observable<{}> {
    return this.http
      .delete<{}>(`http://localhost:3000/todo/${id}`)
      .pipe(tap(() => this.todoService.deleteTodo(id)));
  }
  pathcTodo(id: number, todo: Omit<Todo, 'id' | 'name'>): Observable<Todo> {
    return this.http
      .patch<Todo>(`http://localhost:3000/todo/${id}`, todo)
      .pipe(
        tap((todo) =>
          this.todoService.changeTodoStatus(todo.id, todo.isComplete)
        )
      );
  }
}
