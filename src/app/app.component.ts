import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoStorage } from './services/todoStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TodoAppComponent {
  todoStor: TodoStorage = new TodoStorage();
  filterTodo: Todo [];
  allTodo: Todo [];
  newTodoTitle: String = '';

  constructor() {
    this.todoStor = new TodoStorage();
    this.filterAll();
  }

  addTodo(todoFormAdd): void {
    this.newTodoTitle = todoFormAdd.value.todo;
    if (this.newTodoTitle.trim().length) {
      this.todoStor.add(this.newTodoTitle);
      this.newTodoTitle = '';
      todoFormAdd.reset();
    }
  }

  changeTodoStatus(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  removeTodo(todo: Todo): void {
    this.todoStor.remove(todo);
  }

  filterAll(): void {
    this.filterTodo = this.todoStor.todos;
  }

  filterCompleted(): void {
    const completedTodo: Todo [] = [];
    this.allTodo = this.todoStor.todos;
    this.allTodo.forEach(item => {
      if (item.completed) {
        completedTodo.push(item);
      }
    });

    this.filterTodo = completedTodo;
  }

  filterActive(): void {
    const activeTodo: Todo [] = [];
    this.allTodo = this.todoStor.todos;
    this.allTodo.forEach(item => {
      if (!item.completed) {
        activeTodo.push(item);
      }
    });

    this.filterTodo = activeTodo;
  }
}
