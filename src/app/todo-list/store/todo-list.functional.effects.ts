import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as TodoListActions from './todo-list.action';
import { TodoApiService } from 'src/app/core/services/todo-api.service';

export const addTodoEffect = createEffect(
  (actions$ = inject(Actions), todoApiService = inject(TodoApiService)) =>
    actions$.pipe(
      ofType(TodoListActions.addTodo),
      switchMap((action) => {
        return todoApiService.postTodo(action.todo).pipe(
          map((todo) => TodoListActions.addTodoSucces({ todo })),
          catchError((err) =>
            of(
              TodoListActions.addTodoFailed({
                errorMessage: 'Wystapil blad',
              })
            )
          )
        );
      })
    ),
  { functional: true }
);
