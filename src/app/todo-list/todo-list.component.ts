import { Component } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  totdos: Todo[] = [];
  errorMessage = '';
  changeTodoStatus(todo: Todo) {
    todo.isComplete = !todo.isComplete;
  }

  addTodo(todo: string): void {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno miec conajmniej 4 znaki!';
      return;
    }
    this.totdos.push({ name: todo, isComplete: false });
    console.log('Actualna lista todo: ', this.totdos);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
