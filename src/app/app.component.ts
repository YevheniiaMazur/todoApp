import { Component } from '@angular/core';
import { TodoStore, Todo } from './models/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TodoAppComponent {
  todoStore: TodoStore;
  newTodoText: String = '';
  filterTodo: Todo[];

  constructor(todoStore: TodoStore) {
    this.todoStore = todoStore;
    this.filterAll();
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      this.todoStore.remove(todo);
    }

    todo.title = editedTitle;
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  remove(todo: Todo) {
    this.todoStore.remove(todo);
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo);
  }

  filterCompleted() {
    const allTodo = this.todoStore.todos;
    const completedTodo = [];

    allTodo.forEach(item => {
      if (item.completed) {
        completedTodo.push(item);
      }
    });
    this.filterTodo = completedTodo;
  }

  filterAll() {
    this.filterTodo = this.todoStore.todos;
  }

  filterActive() {
    const allTodo = this.todoStore.todos;
    const activeTodo = [];

    allTodo.forEach(item => {
      if (!item.completed) {
        activeTodo.push(item);
      }
    });
    this.filterTodo = activeTodo;
  }
}
