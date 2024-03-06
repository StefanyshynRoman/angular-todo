import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/shared/interface/todo.interface';

export const addTodo = createAction(
  '[Todo List ] Add Todo',
  props<{ todo: Todo }>()
);

export const deleteTodo = createAction(
  '[Todo List] Delete Todo',
  props<{ id: number }>()
);
export const changeTodoStatus = createAction(
  '[Todo List] Change Status Todo',
  props<{ id: number }>()
);