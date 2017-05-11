import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TodoAppComponent } from './app.component';
import { Todo, TodoStore } from './models/store.model';
import { FormsModule } from '@angular/forms';

describe('TodoApp', () => {
  let fixture: ComponentFixture<TodoAppComponent>;
  let app: TodoAppComponent;
  let todo: Todo;
  let editedTitle: String;
\

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoAppComponent
      ],
      imports: [FormsModule],
      providers: [TodoStore]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAppComponent);
    app = fixture.debugElement.componentInstance;
    todo = new Todo('testTodo');
  }));

  afterEach(() => {
    localStorage.clear();
  });

  it('should add todo', () => {
    app.newTodoText = 'text';

    app.addTodo();

    expect(app.todoStore.todos[0].title).toBe('text');
    expect(app.newTodoText).toBe('');
  });

  it('should not add empty todo', () => {
    spyOn(app.todoStore, 'add');

    app.addTodo();

    expect(app.todoStore.add).not.toHaveBeenCalled();
  });

  it('should change editing flag of todo', () => {
    app.editTodo(todo);

    expect(todo.editing).toBeTruthy();
  });

  it('should stop editing', () => {
    editedTitle = todo.title;

    app.editTodo(todo);
    app.stopEditing(todo, editedTitle.toString());

    expect(todo.title).toBe(editedTitle);
    expect(todo.editing).not.toBeTruthy();
  });

  it('should update editing todo', () => {
    editedTitle = 'newTitle';

    app.editTodo(todo);
    app.updateEditingTodo(todo, editedTitle.toString());

    expect(todo.title).toBe(editedTitle);
    expect(todo.editing).not.toBeTruthy();
  });

  it('should delete empty todo', () => {
    editedTitle = '';

    spyOn(app.todoStore, 'remove');

    app.updateEditingTodo(todo, editedTitle.toString());

    expect(app.todoStore.remove).toHaveBeenCalled();
  });

  it('should cancel editing todo', () => {
    app.editTodo(todo);
    app.cancelEditingTodo(todo);

    expect(todo.editing).not.toBeTruthy();
  });

  it('should remove todo', () => {
    spyOn(app.todoStore, 'remove');

    app.remove(todo);

    expect(app.todoStore.remove).toHaveBeenCalledWith(todo);
  });

  it('should remove completed', () => {
    spyOn(app.todoStore, 'removeCompleted');

    app.removeCompleted();

    expect(app.todoStore.removeCompleted).toHaveBeenCalled();
  });

  it('should call toggleCompletion', () => {
    spyOn(app.todoStore, 'toggleCompletion');

    app.toggleCompletion(todo);

    expect(app.todoStore.toggleCompletion).toHaveBeenCalledWith(todo);
  });

  it('filterCompleted should be empty without completed todo', () => {
    app.todoStore.add('todo1');
    app.todoStore.add('todo2');

    app.filterCompleted();

    expect(app.filterTodo).toEqual([]);
  });

  it('filterCompleted contains completed todos', () => {
    app.todoStore.add('todo1');
    app.todoStore.add('todo2');
    app.todoStore.toggleCompletion(app.todoStore.todos[0]);

    app.filterCompleted();

    expect(app.filterTodo).toContain(app.todoStore.todos[0]);
  });

  it('filterActive is empty without active todo', () => {
    app.todoStore.add('todo1');
    app.todoStore.add('todo2');
    app.todoStore.toggleCompletion(app.todoStore.todos[0]);
    app.todoStore.toggleCompletion(app.todoStore.todos[1]);

    console.log(app.filterTodo);
    app.filterActive();
    console.log(app.filterTodo);

    expect(app.filterTodo).toEqual([]);
  });

  it('filterActive contains active todos', () => {
    app.todoStore.add('todo1');
    app.todoStore.add('todo2');
    app.todoStore.toggleCompletion(app.todoStore.todos[0]);

    app.filterActive();

    expect(app.filterTodo).toContain(app.todoStore.todos[1]);
  });
});
