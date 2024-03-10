import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/app.reducer';
import { TodoApiService } from '../core/services/todo-api.service';
import { TodoService } from '../core/services/todo.service';
import { Todo } from '../shared/interface/todo.interface';
import * as TodoListActios from './store/todo-list.action';
import {
  selectTodoListTodos,
  selectTodoListTodosState,
} from './store/todo-list.selector';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  //todos: Todo[] = this.todoService.todos;
  todos: Todo[] = [];
  errorMessage: null | string = null;
  sub!: Subscription;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // this.sub = this.todoService.todoChanged.subscribe({
    //   next: (arrTodos) => (this.todos = arrTodos),
    // });
    // if (this.todos.length === 0) {
    //   this.todoApiService.getTodos().subscribe({
    //     error: (err) => {
    //       this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //     },
    //   });
    // }
    this.store.dispatch(TodoListActios.fetchTodos());
    this.sub = this.store.select(selectTodoListTodosState).subscribe({
      next: ({ todos, loading, erorrMsg }) => {
        console.log('TTest:', todos, loading, erorrMsg);
        this.todos = [...todos];
        this.errorMessage = erorrMsg;
      },
    });
  }

  addTodo(todo: string) {
    // this.todoApiService.postTodo({ name: todo, isComplete: false }).subscribe({
    //   error: (err) => {
    //     this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //   },
    // });
    const id = this.todos[this.todos.length - 1].id + 1;
    this.store.dispatch(
      TodoListActios.addTodo({ todo: { name: todo, isComplete: false } })
    );
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
  deleteTodo(id: number) {
    // this.todoApiService.deleteTodo(id).subscribe({
    //   error: (err) => {
    //     this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //   },
    // });
    this.store.dispatch(TodoListActios.deleteTodo({ id }));
  }

  changeTodoStatus(id: number, todo: Todo) {
    // this.todoApiService
    //   .pathcTodo(id, { isComplete: !todo.isComplete })
    //   .subscribe({
    //     error: (err) => {
    //       this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //     },
    //   });
    this.store.dispatch(TodoListActios.changeTodoStatus({ id }));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
