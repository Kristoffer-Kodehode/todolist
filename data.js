const localStorageKey = "todoList";
let todoList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

let currentSort = "";
let currentSortOrder = "ascending";
const flipSortOrder = () => {
  currentSortOrder = currentSortOrder === "ascending" ? "descending" : "ascending";
};

/*function filterTodoList(text) {
  const newArray = todoList.filter((todo) => {
    if todo.name === 
  })
}*/

function updateLS() {
  localStorage.setItem(localStorageKey, JSON.stringify(todoList));
}

function addTodo(todoText) {
  todoList.push({
    name: todoText,
    id: Date.now(),
  });
}

function removeTodo(todo) {
  todoList = todoList.filter((item) => {
    if (item.id === todo.id) return false;
    return true;
  });
  updateLS();
}

function sortTodos(sortBy) {
  const isOrderAscending = currentSortOrder === "ascending" ? 1 : -1;

  todoList.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return 1 * isOrderAscending;
    else if (a[sortBy] < b[sortBy]) return -1 * isOrderAscending;
    return 0;
  });
  currentSort = sortBy;
}

function timeStamp2DateTime(timeStamp) {
  let dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let dateFormat = new Intl.DateTimeFormat("no-NO", dateOptions);
  let viewFormattedDate = dateFormat.format(timeStamp);

  return viewFormattedDate;
}

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
