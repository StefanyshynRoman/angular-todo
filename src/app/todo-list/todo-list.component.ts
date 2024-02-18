import { Component } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';
import { TodoService } from '../core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = this.todoService.todos;
  errorMessage = '';

  constructor(private todoService: TodoService) {}

  addTodo(todo: string) {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno miec co najmniej 4 znaki! ';
      return;
    }
    this.todoService.addTodo(todo);
    this.todos = this.todoService.todos;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
  deleteTodo(i: number) {
    this.todoService.deleteTodo(i);
    this.todos = this.todoService.todos;
  }
  changeTodoStatus(index: number) {
    this.todoService.changeTodoStatus(index);
    this.todos = this.todoService.todos;
  }
}
