import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/interface/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TodoApiService } from '../core/services/todo-api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | undefined;
  id!: number;
  errorMessage = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private todoApiService: TodoApiService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.todoApiService.getTodo(Number(params.get('id')))
        )
      )
      .subscribe({
        next: (todo) => {
          this.todo = { ...todo };
        },
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = 'Nie ma zadania o podobnym numerze id';
          } else {
            this.errorMessage = 'Wystopil blad. Sprobuj ponownie';
          }
        },
      });
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }
  navigateBack() {
    this.location.back();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
