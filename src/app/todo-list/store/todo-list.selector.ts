import { createSelector } from '@ngrx/store';
import { AppState } from 'src/store/app.reducer';
import { TodoListState } from './todo-list.reducer';

export const selectTodoList = (state: AppState) => state.todos;

export const selectTodoListTodos = createSelector(
  selectTodoList,
  (state: TodoListState) => state.todos
);
export const selectTodoListActiveTodos = createSelector(
  selectTodoList,
  (state: TodoListState) => state.todos.filter((todo) => !todo.isComplete)
);
