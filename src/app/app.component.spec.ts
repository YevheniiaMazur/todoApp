import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoAppComponent } from './app.component';
import { Todo } from './models/todo.model';

describe('Todo App ', () => {
  let fixture: ComponentFixture<TodoAppComponent>;
  let app: TodoAppComponent;
  let todo: Todo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoAppComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(TodoAppComponent);
    app = fixture.debugElement.componentInstance;
    todo = new Todo('todoName');
  });

  it('check add todo with title', () => {
    spyOn(app.todoStore, 'add');
    const todoFormAdd = {
      value: {todo: 'todo'},
      reset: res => res
    };
    app.addTodo(todoFormAdd);

    expect(app.todoStore.add).toHaveBeenCalledWith('todo');
  });

  it('check add todo without title', () => {
    spyOn(app.todoStore, 'add');
    const todoFormAdd = {
      value: {todo: ''},
      reset: res => res
    };
    app.addTodo(todoFormAdd);

    expect(app.todoStore.add).not.toHaveBeenCalled();
  });

  it('check remove todo', () => {
    spyOn(app.todoStore, 'remove');

    app.removeTodo(todo);

    expect(app.todoStore.remove).toHaveBeenCalledWith(todo);
  });

  it('check filter completed with complete todo', () => {
    todo.completed = true;
    app.todoStore.todos = [todo];

    app.filterTodo('COMPLETED');

    expect(app.filterArray).toContain(todo);
  });

  it('check filter completed with active todo', () => {
    app.todoStore.todos = [todo];

    app.filterTodo('COMPLETED');

    expect(app.filterArray).not.toContain(todo);
  });

  it('check filter active with active todo', () => {
    app.todoStore.todos = [todo];

    app.filterTodo('ACTIVE');

    expect(app.filterArray).toContain(todo);
  });

  it('check filter active with complete todo', () => {
    todo.completed = true;
    app.todoStore.todos = [todo];

    app.filterTodo('ACTIVE');

    expect(app.filterArray).not.toContain(todo);
  });
});
