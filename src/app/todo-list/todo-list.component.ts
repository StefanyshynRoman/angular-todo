import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = this.todoService.todos;
  errorMessage = '';
  sub!: Subscription;

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (arrTodos) => (this.todos = arrTodos),
    });
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
