//main selectors of todos
const addBtn = document.getElementById("addCard");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const mainWrapper = document.querySelector(".wrapper");

//information of todos
const total = document.getElementById("totalCount");
const completed = document.getElementById("completedCount");
const pending = document.getElementById("pendingCount");

//information button handler
const totalBtn = document.getElementById("total");
const completedBtn = document.getElementById("completed");
const pendingBtn = document.getElementById("pending");

//theme button handler
const themeChanger = document.querySelector(".bgToggler button");

// Function to set the theme based on the provided theme
function setTheme(theme) {
  const body = document.body;
  if (theme === "dark") {
    body.classList.add("dark");
    themeChanger.innerText = "🌥️";
  } else {
    body.classList.remove("dark");
    themeChanger.innerText = "🌙";
  }
}

// Retrieve the stored theme from localStorage
const storedTheme = JSON.parse(localStorage.getItem("todobg")) || "light";
setTheme(storedTheme);

// Add event listener to the button to toggle theme
themeChanger.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("todobg", JSON.stringify(newTheme));
});


totalBtn.addEventListener("click", totalTodos);
completedBtn.addEventListener("click", completedTodos);
pendingBtn.addEventListener("click", pendingTodos);

let AllTodos = todos;
let edit = false;
let taskCount = AllTodos.length + 1;

if (todos.length) {
  todos.forEach((todo) => addNewTodo(todo, false));
}
//add new to handler
addBtn.addEventListener("click", () => {
  let newTodo = {
    title: `Task-${taskCount}`,
    text: "",
    status: "pending",
  };
  taskCount++;
  addNewTodo(newTodo, true);
  updateCounters();
});

function addNewTodo(todo, isEdit) {
  edit = isEdit;
  //todo card component
  const todoCard = document.createElement("li");
  todoCard.classList.add("card");
  todoCard.innerHTML = `
  <div class="heading">
    <input class="inputhead ${edit ? "" : "hidden"}" type="text" value="${
    todo.title
  }">
    <h3 class="texthead ${edit ? "hidden" : ""}">${todo.title}</h3>
    <i class="fas ${
      edit ? "fa-floppy-disk" : "fa-pen-to-square"
    }" id="edit"></i>
    <i class="fas fa-trash" id="delete"></i>
  </div>
  <div class="text">
    <textarea class="textpad ${edit ? "" : "hidden"}"></textarea>
    <div class="textpad maintext ${edit ? "hidden" : ""}"></div>
  </div>
  <div class="mark ${edit ? "active" : ""}">
    <input type="checkbox" id="checkmark" ${
      todo.status === "completed" ? "checked" : ""
    }>
    <h3 class="status ${todo.status === "completed" ? "green" : ""}">${
    todo.status
  }</h3>
  </div>
  `;
  //todo assets selectors
  const inputHead = todoCard.querySelector(".inputhead");
  const textHead = todoCard.querySelector(".texthead");
  const editBtn = todoCard.querySelector("#edit");
  const deleteBtn = todoCard.querySelector("#delete");
  const mainText = todoCard.querySelector(".maintext");
  const textArea = todoCard.querySelector("textarea");
  const checkmark = todoCard.querySelector("#checkmark");
  const status = todoCard.querySelector(".status");

  //default values
  textArea.value = todo.text;
  mainText.innerHTML = todo.text;
  checkmark.checked = todo.status === "completed";

  //delete todo handler
  deleteBtn.addEventListener("click", () => {
    todoCard.remove();
    updateLocalStorage();
    updateCounters();
  });
  //edit/update todo handler
  editBtn.addEventListener("click", () => {
    edit = !edit;
    inputHead.classList.toggle("hidden");
    textHead.classList.toggle("hidden");
    mainText.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    updateLocalStorage();
    updateCounters();
  });

  //title of todo handler
  inputHead.addEventListener("input", (e) => {
    const { value } = e.target;
    textHead.innerHTML = value;
    updateLocalStorage();
    updateCounters();
  });

  //todo text handler
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainText.innerHTML = value;
    updateLocalStorage();
    updateCounters();
  });
  //mark completed or pending handler
  checkmark.addEventListener("click", (e) => {
    const { checked } = e.target;
    todo.status = checked ? "completed" : "pending";
    if (checked) {
      status.classList.add("green");
    } else {
      status.classList.remove("green");
    }
    status.innerHTML = todo.status;
    updateLocalStorage();
    updateCounters();
  });
  //connect with the html parent
  mainWrapper.appendChild(todoCard);
  updateLocalStorage();
  updateCounters();
}

//localstorage handler
function updateLocalStorage() {
  const allTodoCards = document.querySelectorAll(".card");
  AllTodos = Array.from(allTodoCards)
    .map((card) => {
      const title = card.querySelector(".inputhead").value;
      const text = card.querySelector("textarea").value;
      const status = card.querySelector("#checkmark").checked
        ? "completed"
        : "pending";
      return { title, text, status };
    })
    .filter((todo) => todo.text.trim() !== "");
  localStorage.setItem("todos", JSON.stringify(AllTodos));
}

function updateCounters() {
  const totalCount = AllTodos.length;
  const completedCount = AllTodos.filter(
    (todo) => todo.status === "completed"
  ).length;
  const pendingCount = totalCount - completedCount;

  total.innerText = totalCount;
  completed.innerText = completedCount;
  pending.innerText = pendingCount;
}
function totalTodos() {
  const allTodoCards = document.querySelectorAll(".card");
  allTodoCards.forEach((card) => {
    card.style.display = "flex";
    mainWrapper.appendChild(card);
  });
}
function completedTodos() {
  const allTodoCards = document.querySelectorAll(".card");
  allTodoCards.forEach((card) => {
    const checkmark = card.querySelector("#checkmark");
    if (checkmark.checked) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
    mainWrapper.appendChild(card);
  });
}
function pendingTodos() {
  const allTodoCards = document.querySelectorAll(".card");
  allTodoCards.forEach((card) => {
    const checkmark = card.querySelector("#checkmark");
    if (!checkmark.checked) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
    mainWrapper.appendChild(card);
  });
}
updateCounters();
