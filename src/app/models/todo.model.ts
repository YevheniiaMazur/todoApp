export class Todo {
  completed: Boolean;
  title: String;

  constructor(titleValue: String) {
    this.completed = false;
    this.title = titleValue;
  }
}
