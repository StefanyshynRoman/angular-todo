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
  //todos: Todo[] = this.todoService.todos;
  todos: Todo[] = [];
  errorMessage = '';
  sub!: Subscription;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService
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
  }

  addTodo(todo: string) {
    // this.todoApiService.postTodo({ name: todo, isComplete: false }).subscribe({
    //   error: (err) => {
    //     this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //   },
    // });
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
  }

  changeTodoStatus(id: number, todo: Todo) {
    // this.todoApiService
    //   .pathcTodo(id, { isComplete: !todo.isComplete })
    //   .subscribe({
    //     error: (err) => {
    //       this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
    //     },
    //   });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
