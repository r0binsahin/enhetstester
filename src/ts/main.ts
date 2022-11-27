import { addTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

//1
export function init() {
  document.getElementById("clearTodos")?.addEventListener("click", () => {
    exports.clearTodos(todos);
  });
}

exports.init();

//2
(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    exports.createNewTodo(todoText, todos);
  }
);

//3
export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    exports.createHtml(todos);
  } else {
    exports.displayError(result.error, true);
  }
}

//4
export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      exports.toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

//5
export function toggleTodo(todo: Todo) {
  exports.changeTodo(todo);
  exports.createHtml(todos);
}

//6
export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

//7
export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

// denna fil tappade kontakten med changeTodo och vägrade att känna till den. Jag fick fel kod om att changeTodo inte var en functions. Den blev också suddig högst upp på import delen. Så jag flyttade den from filen functions.ts till main.ts. Jag flyttar även dess test till main.ts.test

//8
export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

addEventListener("DOMContentLoaded", () => {
  createHtml(todos);
});
