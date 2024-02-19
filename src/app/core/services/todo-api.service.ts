import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from 'src/app/shared/interface/todo.interface';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private http: HttpClient, private todoService: TodoService) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('http://localhost:3000/todo')
      .pipe(tap((todos: Todo[]) => (this.todoService.todos = todos)));
  }
}
