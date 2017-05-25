import { Todo } from '../models/todo.model';

export class TodoStorage {
  todos = [
    new Todo('create todo-app'),
    new Todo('create tests for todo-app')
  ];

  add(titleValue: String): void {
    this.todos.push(new Todo(titleValue));
  }

  remove(todo: Todo): void {
    this.todos = this.todos.filter(item => item !== todo);
  }

  changeTodoStatus(todo: Todo): void {
    todo.completed = !todo.completed;
  }
}
