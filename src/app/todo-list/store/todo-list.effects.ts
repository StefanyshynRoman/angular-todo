import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoApiService } from 'src/app/core/services/todo-api.service';
import * as TodoListActions from './todo-list.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TodoListEffects {
  fetchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.fetchTodos),
      switchMap((action) => {
        return this.todoService.getTodos().pipe(
          map((todos) => TodoListActions.fetchTodosSucces({ todos })),
          catchError((err) =>
            of(
              TodoListActions.fetchTodosFailed({
                errorMessage: 'Wystapil blad',
              })
            )
          )
        );
      })
    )
  );
  //   addTodo$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(TodoListActions.addTodo),
  //       switchMap((action) => {
  //         return this.todoService.postTodo(action.todo).pipe(
  //           map((todo) => TodoListActions.addTodoSucces({ todo })),
  //           catchError((err) =>
  //             of(
  //               TodoListActions.addTodoFailed({
  //                 errorMessage: 'Wystapil blad',
  //               })
  //             )
  //           )
  //         );
  //       })
  //     )
  //   );
  constructor(private actions$: Actions, private todoService: TodoApiService) {}
}
