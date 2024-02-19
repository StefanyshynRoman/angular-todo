import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | undefined;
  id!: number;
  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.todo = this.todoService.getTodo(this.id);
    });
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }
  navigateBack() {
    this.location.back();
  }
}
