/**
 * @jest-environment jsdom
 */
import * as fn from "../ts/main";
import { Todo } from "../ts/models/Todo";

//1
describe("init", () => {
  test("should be able to click", () => {
    //arrange
    let spy = jest.spyOn(fn, "clearTodos").mockReturnValue();

    document.body.innerHTML = `
        <button type="button" id="clearTodos">Rensa lista</button>
        `;

    fn.init();

    //act
    document.getElementById("clearTodos")?.click();

    //assert
    expect(spy).toHaveBeenCalled();
  });
});

//2
test("should be able to call createNewTodo", () => {
  let todos: Todo[] = [];

  let spy = jest.spyOn(fn, "createHtml").mockReturnValue();

  fn.createNewTodo("hej", todos);

  expect(spy).toHaveBeenCalled();
});

//3

//4

//5
test("should call functions changeTodo, createHTML", () => {
  let todo: Todo = new Todo("hej", false);

  let spyX = jest.spyOn(fn, "changeTodo").mockReturnValue();
  let spyZ = jest.spyOn(fn, "createHtml").mockReturnValue();

  fn.toggleTodo(todo);

  expect(spyX).toHaveBeenCalled();
  expect(spyZ).toHaveBeenCalled();
});

//6
describe("error message", () => {
  test("should add html to div", () => {
    document.body.innerHTML = `
      <div id="error" class="error"></div>`;
    let error: string = "error";
    let show: boolean = true;

    fn.displayError(error, show);

    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "error"
    );
  });

  test("Should not display error message", () => {
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let error: string = "error";
    let show: boolean = false;
    errorContainer.innerHTML = error;
    //Act
    fn.displayError(error, show);
    //Assert
    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "error"
    );
  });
});

//7
describe("clearTodos", () => {
  test("should call function", () => {
    let todos: Todo[] = [new Todo("hej", true), new Todo("tja", false)];
    let spy = jest.spyOn(fn, "clearTodos").mockReturnValue();

    fn.clearTodos(todos);

    expect(spy).toBeCalledWith(todos);
  });

  test("should call function withr", () => {
    let todos: Todo[] = [new Todo("hej", true), new Todo("tja", false)];
    let spy = jest.spyOn(fn, "createHtml").mockReturnValue();

    fn.createHtml(todos);

    expect(spy).toBeCalledWith(todos);
  });
});

//8
test("Should toggle the boolean", () => {
  //arrange
  let todoText: string = "hej";
  let done: boolean = false;
  let todo: Todo = new Todo(todoText, done);

  //act
  fn.changeTodo(todo);

  //assert
  expect(todo.done).toBe(false);
});
