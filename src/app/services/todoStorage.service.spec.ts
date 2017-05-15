import { TestBed, async, inject } from '@angular/core/testing';
import { Todo } from '.././models/todo.model';
import { TodoStorage } from './todoStorage.service';

describe('TodoStorage service ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TodoStorage]
    }).compileComponents();

  }));

  it('check add todo service', inject([TodoStorage], (ts: TodoStorage) => {

    spyOn(ts.todos, 'push');
    ts.add('testTodo');

    expect(ts.todos.push).toHaveBeenCalledWith(new Todo('testTodo' ));
  }));

  it('check remove todo service', inject([TodoStorage], (ts: TodoStorage) => {

    spyOn(ts.todos, 'splice');

    ts.remove(ts.todos[0]);

    expect(ts.todos.splice).toHaveBeenCalledWith(0, 1);
    }));
});

