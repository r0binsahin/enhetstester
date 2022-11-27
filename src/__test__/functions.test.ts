/**
 * @jest-environment jsdom
 */

import { addTodo, removeAllTodos } from "../ts/functions";
import { IAddResponse } from "../ts/models/IAddResult";
import { Todo } from "../ts/models/Todo";

test("should add to the list correctly", () => {
  //arrage
  let todoText: string = "hej";
  let done: boolean = false;
  let todos: Todo[] = [new Todo(todoText, done)];

  //act
  let response = addTodo(todoText, todos);

  //assert
  expect(response.success).toBe(true);
  expect(todos.length).toBe(todos.length++);
});

test("should  not add to the list", () => {
  //arrage
  let todoText: string = "";
  let done: boolean = false;
  let todos: Todo[] = [new Todo(todoText, done)];

  //act
  let response = addTodo(todoText, todos);

  //assert
  expect(todos.length).toBe(todos.length);
  expect(response.success).toBe(false);
});

test("should remove all correctly", () => {
  //Arrage
  let todoText: string = "hej";
  let done: boolean = false;
  let todos: Todo[] = [new Todo(todoText, done)];

  //Act
  removeAllTodos(todos);
  //Assert
  expect(todos.length).toBe(0);
});
