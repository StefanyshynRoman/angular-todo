import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/shared/interface/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  openModal = false;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {}
  changeTodoStatus() {
    this.changeStatus.emit(this.i);
  }
  toggleModal() {
    this.openModal = !this.openModal;
  }
  deleteTodo() {
    this.delete.emit();
  }
  navigateToDetails() {
    this.router.navigate(['/todo', this.i]);
  }
}
