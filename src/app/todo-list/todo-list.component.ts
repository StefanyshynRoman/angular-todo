import { Component } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  totdos: Todo[] = [];
  addTodo(todo: string): void {
    if (todo.length <= 3) {
      alert('Zadanie powinno miec conajmniej 4 znaki! ');
      return;
    }
    this.totdos.push({ name: todo, isComplete: false });
    console.log('Actualna lista todo: ', this.totdos);
  }
}
