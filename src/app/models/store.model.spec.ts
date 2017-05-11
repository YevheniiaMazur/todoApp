import { TestBed, async, inject } from '@angular/core/testing';
import { Todo, TodoStore } from './store.model';

describe('ToDoApp model and service', () => {
  let todoStore: TodoStore;
  // const app: TodoAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStore]
    });
    todoStore = new TodoStore();
  });

  afterEach(() => {
    localStorage.clear();
  });



  // it('test removeCompleted todo', () => {
  //   todoStore.todos.push(new Todo('sdfvcds'));
  //   todoStore.todos[0].completed = true;
  //   // spyOn(todoStore, 'getWithCompleted');
  //   // spyOn(todoStore, 'updateStore');
  //
  //   console.log(todoStore.todos);
  //   todoStore.removeCompleted();
  //   console.log(todoStore.todos);
  //
  //   // expect(todoStore.getWithCompleted).toHaveBeenCalledWith(false);
  //   // expect(todoStore.updateStore).toHaveBeenCalled();
  //   // expect()
  // });
  // it('test removeCompleted todo', () => {
  //   todoStore.add('todo1');
  //   todoStore.add('todo2');
  //   todoStore.toggleCompletion(todoStore.todos[0]);
  //   console.log(todoStore.todos);
  //   todoStore.removeCompleted();
  //   console.log(todoStore.todos);
  //
  // })
})

