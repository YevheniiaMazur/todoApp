import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TodoAppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo.model';

describe('Todo App ', () => {
  let fixture: ComponentFixture<TodoAppComponent>;
  let app: TodoAppComponent;
  let todo: Todo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoAppComponent
      ],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TodoAppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {

    expect(app).toBeTruthy();
  }));

  it('check add todo with title', () => {
    spyOn(app.todoStor, 'add');
    const todoFormAdd = {
      value: {todo: 'todoname'},
      reset: res => res
    }
    app.addTodo(todoFormAdd);

    expect(app.todoStor.add).toHaveBeenCalledWith('todoname');
  });

  it('check add todo without title', () => {
    spyOn(app.todoStor, 'add');
    const todoFormAdd = {
      value: {todo: ''},
      reset: res => res
    }
    app.addTodo(todoFormAdd);

    expect(app.todoStor.add).not.toHaveBeenCalled();
  });

  it('check remove todo', () => {
    spyOn(app.todoStor, 'remove');

    app.removeTodo(todo);

    expect(app.todoStor.remove).toHaveBeenCalledWith(todo);
  });

  it('check change todo status', () => {
    todo = new Todo('new todo');

    app.changeTodoStatus(todo);

    expect(todo.completed).toBeTruthy();
  });

  it('check filter completed with complete todo', () => {
    app.todoStor.todos = [
      new Todo('create todo-app')
    ];
    app.todoStor.todos[0].completed = true;

    app.filterCompleted();

    expect(app.filterTodo).toContain(app.todoStor.todos[0]);
  });

  it('check filter completed with active todo', () => {
    app.todoStor.todos = [
      new Todo('create todo-app')
    ];

    app.filterCompleted();

    expect(app.filterTodo).not.toContain(app.todoStor.todos[0]);
  });

  it('check filter active with active todo', () => {
    app.todoStor.todos = [
      new Todo('create tests for todo-app')
    ];

    app.filterActive();

    expect(app.filterTodo).toContain(app.todoStor.todos[0]);
  });

  it('check filter active with complete todo', () => {
    app.todoStor.todos = [
      new Todo('create tests for todo-app')
    ];
    app.todoStor.todos[0].completed = true;

    app.filterActive();

    expect(app.filterTodo).not.toContain(app.todoStor.todos[0]);
  });
});
