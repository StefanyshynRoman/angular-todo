import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
})
export class AddTodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();

  todoName = '';

  addNewTodo() {
    this.addTodo.emit(this.todoName);
  }
}
