import { TestBed } from '@angular/core/testing';

import { Todo } from '.././models/todo.model';
import { TodoStorage } from './todoStorage.service';

describe('Service. TodoStorage', () => {
  let storage: TodoStorage;
  let arrLengthStart: number;
  let arrLengthEnd: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStorage]
    });

    storage = TestBed.get(TodoStorage);
  });

  it('check add todo service', () => {
    arrLengthStart = storage.todos.length;

    storage.add('testTodo');
    arrLengthEnd = storage.todos.length;

    expect(storage.todos[arrLengthEnd - 1].title).toEqual('testTodo');
    expect(arrLengthEnd).toEqual(arrLengthStart + 1);
  });

  it('check remove todo service', () => {
    storage.todos = [
      {title: 'todo1', completed: false},
      {title: 'todo2', completed: false}
    ];
    arrLengthStart = storage.todos.length;
    const todo: Todo = storage.todos[0];

    storage.remove(todo);
    arrLengthEnd = storage.todos.length;

    expect(storage.todos).not.toContain(todo);
    expect(arrLengthEnd).toEqual(arrLengthStart - 1);
  });

  it('check change todo status', () => {
    const todo = new Todo('new todo');

    storage.changeTodoStatus(todo);

    expect(todo.completed).toBeTruthy();
  });
});

