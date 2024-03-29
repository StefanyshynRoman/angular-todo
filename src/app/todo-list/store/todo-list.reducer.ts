import { createReducer, Action, on } from '@ngrx/store';
import { Todo } from 'src/app/shared/interface/todo.interface';
import * as TodoListActios from './todo-list.action';

export interface TodoListState {
  todos: Todo[];
  fetchTodosErrorMessage: string | null;
  loading: boolean;
  addTodoErrorMessage: string | null;
}
const initialState: TodoListState = {
  todos: [
    // {
    //   id: 1,
    //   isComplete: true,
    //   name: 'Umyj naczynia.',
    // },
    // {
    //   id: 2,
    //   isComplete: true,
    //   name: 'Umyj naczynia2.',
    // },
    // {
    //   id: 3,
    //   isComplete: false,
    //   name: 'Umyj naczynia3.',
    // },
  ],
  fetchTodosErrorMessage: null,
  loading: false,
  addTodoErrorMessage: null,
};

const _todoListReducer = createReducer(
  initialState,
  // on(TodoListActios.addTodo, (state, action) => ({
  //   ...state,
  //   todos: state.todos.concat({ ...action.todo }),
  // })),
  on(TodoListActios.deleteTodo, (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.id),
  })),
  on(TodoListActios.changeTodoStatus, (state, action) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === action.id ? { ...todo, isComplete: !todo.isComplete } : todo
    ),
  })),
  on(TodoListActios.fetchTodosSucces, (state, action) => ({
    ...state,
    todos: [...action.todos],
    loading: false,
    fetchTodosErrorMessage: null,
  })),
  on(TodoListActios.fetchTodos, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(TodoListActios.fetchTodosFailed, (state, action) => ({
    ...state,
    loading: false,
    fetchTodosErrorMessage: action.errorMessage,
  })),
  on(TodoListActios.addTodoSucces, (state, action) => ({
    ...state,
    todos: state.todos.concat({ ...action.todo }),
    loading: false,
    addTodoErrorMessage: null,
  })),
  on(TodoListActios.addTodo, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(TodoListActios.addTodoFailed, (state, action) => ({
    ...state,
    loading: false,
    addTodoErrorMessage: action.errorMessage,
  }))
);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
