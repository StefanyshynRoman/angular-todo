import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Todo } from 'src/app/shared/interface/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() id!: number;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  openModal = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {}
  changeTodoStatus() {
    this.changeStatus.emit(this.id);
  }
  toggleModal() {
    this.openModal = !this.openModal;
  }
  deleteTodo() {
    this.delete.emit();
  }
  navigateToDetails() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      // queryParams: { id: this.i, test: 'wartosc' },
    };
    this.router.navigate([this.id], navigationExtras);
  }
}
