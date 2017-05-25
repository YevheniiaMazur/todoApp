export class Todo {
  title: String;
  completed: Boolean;

  constructor(titleValue: String) {
    this.title = titleValue;
    this.completed = false;
  }
}
