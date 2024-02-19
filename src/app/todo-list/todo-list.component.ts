import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../core/services/todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = this.todoService.todos;
  errorMessage = '';
  sub!: Subscription;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService
  ) {}
  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (arrTodos) => (this.todos = arrTodos),
    });

    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
        error: (err) => {
          this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
        },
      });
    }
  }

  addTodo(todo: string) {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno miec co najmniej 4 znaki! ';
      return;
    }
    this.todoService.addTodo(todo);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
  deleteTodo(i: number) {
    this.todoService.deleteTodo(i);
  }
  changeTodoStatus(index: number) {
    this.todoService.changeTodoStatus(index);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
