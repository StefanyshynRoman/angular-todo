import { createAction, props } from '@ngrx/store';
import { omit } from '@ngrx/store/src/utils';
import { Todo } from 'src/app/shared/interface/todo.interface';

// export const addTodo = createAction(
//   '[Todo List ] Add Todo',
//   props<{ todo: Todo }>()
// );

export const deleteTodo = createAction(
  '[Todo List] Delete Todo',
  props<{ id: number }>()
);
export const changeTodoStatus = createAction(
  '[Todo List] Change Status Todo',
  props<{ id: number }>()
);

export const fetchTodos = createAction('[Todo List] Fetch Todos');

export const fetchTodosSucces = createAction(
  '[Todo List] Fetch Todos Succes',
  props<{ todos: Todo[] }>()
);
export const fetchTodosFailed = createAction(
  '[Todo List] Fetch Todos Succes Failed',
  props<{ errorMessage: string }>()
);

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Omit<Todo, 'id'> }>()
);

export const addTodoSucces = createAction(
  '[Todo List]  Add Todo Succes',
  props<{ todo: Todo }>()
);
export const addTodoFailed = createAction(
  '[Todo List]  Add Todo  Failed',
  props<{ errorMessage: string }>()
);
