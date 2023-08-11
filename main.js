import {
  todoList,
  currentSort,
  currentSortOrder,
  updateLS,
  timeStamp2DateTime,
  removeTodo,
  addTodo,
  sortTodos,
  flipSortOrder,
} from "./data.js";

const formEl = document.querySelector("#their-form");
const formInput = document.querySelector("#form-input");
const todoRenderEl = document.querySelector("#todo-list-render");
const errorEl = document.querySelector("#error");

formEl.addEventListener("submit", handleForm);
/*formInput.addEventListener("input", (event) => {
  function checkFormData(data) {
      if (data.length < 3) {
        errorEl.textContent = "Please enter 3 or more characters";
        return;
      }
      return true 
  }
})*/

render();

function handleForm(event) {
  event.preventDefault();

  const formText = formInput.value;

  //check if form data is valid
  //if (!checkFormData(event.target.value)) return

  if (formText.length < 3) {
    errorEl.textContent = "Please enter 3 or more characters";
    return;
  }
  errorEl.textContent = "";

  addTodo(formText);

  render();
  formInput.value = "";

  updateLS();
}

function render() {
  todoRenderEl.innerHTML = "";
  todoList.forEach(createHTML);
}

function createHTML(todo) {
  const todoItem = document.createElement("li");
  const todoText = document.createElement("p");
  todoText.textContent = todo.name;
  todoItem.id = todo.id;

  const listOptEl = document.createElement("div");
  listOptEl.classList.add("list-opt");

  const removeButton = document.createElement("img");
  removeButton.src = "img/trashcan-whitesmoke.svg";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    todoItem.remove();
    removeTodo(todo);
  });

  const timeEl = document.createElement("span");
  timeEl.textContent = timeStamp2DateTime(todo.id);
  timeEl.classList.add("time-el");

  listOptEl.append(timeEl, removeButton);
  todoItem.append(todoText, listOptEl);
  todoRenderEl.append(todoItem);
}

const sortNameBtn = document.getElementById("sort-name");
const sortTimeBtn = document.getElementById("sort-time");
const flipOrderBtn = document.getElementById("flip");

sortNameBtn.addEventListener("click", () => {
  sortTodos("name");
  render();
});
sortTimeBtn.addEventListener("click", () => {
  sortTodos("id");
  render();
});
flipOrderBtn.addEventListener("click", () => {
  flipOrderBtn.textContent = `Sort order: ${currentSortOrder}`;
  flipSortOrder();
  sortTodos(currentSort);
});
