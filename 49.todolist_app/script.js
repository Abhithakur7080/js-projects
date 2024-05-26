let list = [];
let completed_list = [];
let pending_list = [];
let total_list = [];
let add_Button = document.getElementById("addbtn");
let input = document.getElementById("add-input");
let delete_all_button = document.getElementById("delete-all");
let delete_selected_button = document.getElementById("delete-selected");
let all_tasks = document.getElementById("all-tasks");

add_Button.addEventListener("click", add);
delete_all_button.addEventListener("click", deleteall);
delete_selected_button.addEventListener("click", deleteseleted);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("mark")) {
    completeTask(e);
  }
  if (e.target.classList.contains("delete-task")) {
    deleteTask(e);
  }
  if (e.target.id === "all") {
    viewAll();
  }
  if (e.target.id === "pend") {
    viewPending();
  }
  if (e.target.id === "comp") {
    viewCompleted();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});

function update() {
  completed_list = list.filter((e) => e.complete);
  pending_list = list.filter((e) => !e.complete);
  total_list = list;

  document.getElementById("pend-count").innerText = pending_list.length.toString();
  document.getElementById("comp-count").innerText = completed_list.length.toString();
  document.getElementById("tot-count").innerText = list.length.toString();
}

function add() {
  let value = input.value;
  if (value === "") {
    alert("Please Enter a task :)");
    return;
  }
  list.push({
    task: value,
    id: Date.now().toString(),
    complete: false,
  });
  input.value = "";

  update();
  addinmain(total_list);
}

function addinmain(taskList) {
  all_tasks.innerHTML = "";
  taskList.forEach((element) => {
    let taskHTML = `
      <li id=${element.id} class="item">
        <p id="task">📝 ${element.complete ? `<strike>${element.task}</strike>` : element.task}</p>
        <div class="todo-actions">
          <button class="mark ${element.complete ? "complete-task" : "mark-task"}">${element.complete ? "Completed" : "Mark as complete"}</button>
          <button class="delete-task">Delete</button>
        </div>
      </li>`;
    all_tasks.innerHTML += taskHTML;
  });
}

function deleteTask(e) {
  let deleted = e.target.parentElement.parentElement.getAttribute("id");
  list = list.filter((e) => e.id != deleted);
  update();
  addinmain(total_list);
}

function completeTask(e) {
  let completed = e.target.parentElement.parentElement.getAttribute("id");
  list.forEach((obj) => {
    if (obj.id == completed) {
      obj.complete = !obj.complete;
    }
  });
  update();
  addinmain(total_list);
}

function deleteall() {
  list = [];
  update();
  addinmain(total_list);
}

function deleteseleted() {
  list = list.filter((e) => !e.complete);
  update();
  addinmain(total_list);
}

function viewCompleted() {
  addinmain(completed_list);
}

function viewPending() {
  addinmain(pending_list);
}

function viewAll() {
  addinmain(total_list);
}
