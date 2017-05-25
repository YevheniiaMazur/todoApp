import { Component } from '@angular/core';

import { Todo } from './models/todo.model';
import { TodoStorage } from './services/todoStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TodoAppComponent {
  todoStore: TodoStorage = new TodoStorage();
  filterArray: Todo [];
  newTodoTitle: String = '';

  constructor() {
    this.filterTodo('ALL');
  }

  addTodo(todoFormAdd): void {
    this.newTodoTitle = todoFormAdd.value.todo;
    if (this.newTodoTitle.trim().length) {
      this.todoStore.add(this.newTodoTitle);
      this.newTodoTitle = '';
      todoFormAdd.reset();
    }
  }

  removeTodo(todo: Todo): void {
    this.todoStore.remove(todo);
    this.filterArray = this.todoStore.todos;
  }

  filterTodo(filterName: String) {
    switch (filterName) {
      case 'ALL':
        this.filterArray = this.todoStore.todos;
        break;

      case 'COMPLETED':
        this.filterArray = this.todoStore.todos.filter(item => item.completed === true);
        break;

      case 'ACTIVE':
        this.filterArray = this.todoStore.todos.filter(item => item.completed === false);
        break;

      default:
        break;
    }
  }
}
