/**
 * @jest-environment jsdom
 */
import * as fn from "../ts/main";
import { Todo } from "../ts/models/Todo";

import * as functions from "../ts/functions";
import { IAddResponse } from "../ts/models/IAddResult";

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

test("should call function createHtml", () => {
  //test av if-satsen
  //arrrange
  let todoText: string = "hej";
  let todo: Todo[] = [];
  let spy = jest.spyOn(fn, "createHtml").mockReturnValue();

  //act
  fn.createNewTodo(todoText, todo);

  //assert
  expect(spy).toHaveBeenCalled();
});

test("should be able to call createNewTodo", () => {
  let todos: Todo[] = [];

  let spy = jest.spyOn(fn, "createHtml").mockReturnValue();

  fn.createNewTodo("hej", todos);

  expect(spy).toHaveBeenCalled();
});

test("should call functions", () => {
  let todo: Todo = new Todo("hej", false);

  let spyX = jest.spyOn(fn, "changeTodo").mockReturnValue();
  let spyZ = jest.spyOn(fn, "createHtml").mockReturnValue();

  fn.toggleTodo(todo);

  expect(spyX).toHaveBeenCalled();
  expect(spyZ).toHaveBeenCalled();
});

describe("displayError", () => {
  test("should add text to container", () => {
    document.body.innerHTML = `
      <div id="error" class="error"></div>
      `;
    let error = "errortext";
    let show = true;

    fn.displayError(error, show);

    expect(document.getElementById("error")?.innerHTML).toBe("errortext");
  });
});

//7
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
