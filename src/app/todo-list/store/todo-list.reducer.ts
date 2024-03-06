import { createReducer, Action, on } from '@ngrx/store';
import { Todo } from 'src/app/shared/interface/todo.interface';
import * as TodoListActios from './todo-list.action';

export interface TodoListState {
  todos: Todo[];
}
const initialState: TodoListState = {
  todos: [
    {
      id: 1,
      isComplete: true,
      name: 'Umyj naczynia.',
    },
    {
      id: 2,
      isComplete: true,
      name: 'Umyj naczynia2.',
    },
    {
      id: 3,
      isComplete: false,
      name: 'Umyj naczynia3.',
    },
  ],
};

const _todoListReducer = createReducer(
  initialState,
  on(TodoListActios.addTodo, (state, action) => ({
    ...state,
    todos: state.todos.concat({ ...action.todo }),
  })),
  on(TodoListActios.deleteTodo, (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.id),
  })),
  on(TodoListActios.changeTodoStatus, (state, action) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === action.id ? { ...todo, isComplete: !todo.isComplete } : todo
    ),
  }))
);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
