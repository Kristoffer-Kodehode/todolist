"use strict";

//importing stuff used from data
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

//document elements
const formEl = document.querySelector("#their-form");
const formInput = document.querySelector("#form-input");
const todoRenderEl = document.querySelector("#todo-list-render");
const errorEl = document.querySelector("#error");
const sortNameBtn = document.getElementById("sort-name");
const sortTimeBtn = document.getElementById("sort-time");
const flipOrderBtn = document.getElementById("flip");

//render list on page load
render();

//form event upon submitting text to list (either enter or dedicated button)
formEl.addEventListener("submit", handleForm);

//form handler
function handleForm(event) {
  event.preventDefault();

  const formText = formInput.value;

  //error if input is too short
  if (formText.length < 3) {
    errorEl.textContent = "Please enter 3 or more characters";
    return;
  }

  //if error passes, remove any previous error
  errorEl.textContent = "";

  //add input to array
  addTodo(formText);

  //update localstorage
  updateLS();

  //render list
  render();

  //clear input field
  formInput.value = "";
}

//clear render area and (re-)render the list by creating html elements
function render() {
  todoRenderEl.innerHTML = "";
  todoList.forEach(createHTML);
}

//check switch for if a todo is done
let check = "none";
const checkedOrNot = () => {
  check = check === "none" ? "line-through" : "none";
};

//creating html elements with what we need to display
function createHTML(todo) {
  //creating a list item to fill with information
  const todoItem = document.createElement("li");
  const todoText = document.createElement("p");
  todoText.textContent = todo.name;

  todoItem.id = todo.id;

  //add a revertable strikethrough on click on the todo text to mark a task done
  todoText.addEventListener("click", () => {
    checkedOrNot();
    todoText.style.textDecorationLine = check;
  });
  //remove user ability to mark todo text so it won'tbe annoying when checking and unchecking?
  /*todoText.style.userSelect = "none";*/

  //make a div to contain timestamp and remove button
  const listExEl = document.createElement("div");
  listExEl.classList.add("list-Ex");

  //make remove button with click to delete its element
  const removeButton = document.createElement("img");
  removeButton.src = "img/trashcan-whitesmoke.svg";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    todoItem.remove();
    removeTodo(todo);
  });

  //make timestamp from date time function
  const timeEl = document.createElement("span");
  timeEl.textContent = timeStamp2DateTime(todo.id);
  timeEl.classList.add("time-el");

  //append elements to list item and append list item to its render area
  listExEl.append(timeEl, removeButton);
  todoItem.append(todoText, listExEl);
  todoRenderEl.append(todoItem);
}

//buttons for sorting by name or timestamp and a button to flip sorting direction
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
  render();
});
