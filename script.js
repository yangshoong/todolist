let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");

document.addEventListener("DOMContentLoaded", function () {
  let allTab = document.getElementById("all");
  allTab.classList.add("active");
  let activeTab = document.querySelector(".task-tabs .active");
  if (activeTab) {
    horizontalIndicator({ currentTarget: activeTab });
  }
});

window.addEventListener("resize", function () {
  let activeTab = document.querySelector(".task-tabs .active");
  if (activeTab) {
    horizontalIndicator({ currentTarget: activeTab });
  }
});

tabs.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalIndicator(e))
);

function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

let taskList = [];
let mode = "all";
let filterList = [];
let list = [];


function render() {
  list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  } else if (mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done-line" >
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <img src="images/undo.png" alt="Check" class="task-button-img" onClick="toggleComplete('${list[i].id}')"/>
        <img src="images/trash.png" alt="Delete" class="delete-button-img" onClick="deleteTask('${list[i].id}')"/>
      </div>
    </div>`;
    } else if (list[i].isComplete == false) {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
      <img src="images/check.png" alt="Check" class="task-button-img" onClick="toggleComplete('${list[i].id}')"/>
      <img src="images/trash.png" alt="Delete" class="delete-button-img" onClick="deleteTask('${list[i].id}')"/>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
    <img src="images/check.png" alt="Check" class="task-button-img" onClick="toggleComplete('${list[i].id}')"/>
    <img src="images/trash.png" alt="Delete" class="delete-button-img" onClick="deleteTask('${list[i].id}')"/>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    // render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    // render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    // render();
  } 
  // render();
}

function randomIDGenerate() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase();
}


function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  filterList=taskList.filter(task => task.isComplete==false);
  taskInput.value = '';
  render();
}


addButton.addEventListener("click", function (event) {
  if (taskInput.value.trim() === "") {
    alert("내용을 입력해주세요");
    return;
  }
  addTask();
  render();
});


taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if(taskInput.value.trim()===""){
      alert("내용을 입력해주세요");
      return;
    }
    addTask();
    render();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
    render();
  });
}


function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      filterList=filterList.filter(task => task.id!==id);
      break;
    }
  }
  render();
}
