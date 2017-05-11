export class Todo {
  completed: Boolean;
  editing: Boolean;

  private _title: String;
  get title() {
    return this._title;
  }

  set title(value: String) {
    this._title = value.trim();
  }

  constructor(title: String) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
}

export class TodoStore {
  todos: Todo[];

  constructor() {
    const persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
    // Normalize back into classes
    this.todos = persistedTodos.map((todo: { _title: String, completed: Boolean }) => {
      const todo2 = new Todo(todo._title);
      todo2.completed = todo.completed;

      return todo2;
    });
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: String) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }

  private updateStore() {
    localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
  }

  private getWithCompleted(completed: Boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }
}
