//localstorage stuff:
const localStorageKey = "todoList";
let todoList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

//sorting stuff:
let currentSort = "";
let currentSortOrder = "ascending";
const flipSortOrder = () => {
  currentSortOrder = currentSortOrder === "ascending" ? "descending" : "ascending";
};

//updating the local storage with the todoList array
function updateLS() {
  localStorage.setItem(localStorageKey, JSON.stringify(todoList));
}

//adding entries to the todoList array
function addTodo(todoText) {
  todoList.push({
    name: todoText,
    id: Date.now(),
  });
}

//removal function used by remove button
function removeTodo(todo) {
  todoList = todoList.filter((item) => {
    if (item.id === todo.id) return false;
    return true;
  });
  updateLS();
}

//sorting function
function sortTodos(sortBy) {
  const isOrderAscending = currentSortOrder === "ascending" ? 1 : -1;

  todoList.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return 1 * isOrderAscending;
    else if (a[sortBy] < b[sortBy]) return -1 * isOrderAscending;
    return 0;
  });
  currentSort = sortBy;
}

//making a date and time stamp from timestamp
function timeStamp2DateTime(timeStamp) {
  let dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };

  let dateFormat = new Intl.DateTimeFormat("no-NO", dateOptions);
  let viewFormattedDate = dateFormat.format(timeStamp);

  return viewFormattedDate;
}

//exporting stuff used in main
export {
  todoList,
  currentSort,
  currentSortOrder,
  updateLS,
  timeStamp2DateTime,
  removeTodo,
  addTodo,
  sortTodos,
  flipSortOrder,
};
