// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true를false로
// 2. true이면 끝난걸로 간주하고 및줄
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴.

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
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // 엔터키가 눌렸을 때만 addTask 함수를 호출합니다.
    addTask();
    // 기본 이벤트를 방지하여 폼 제출을 막습니다.
    event.preventDefault();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  list = [];
  // 1. 내가 선택한 탭에 따라서
  if (mode === "all") {
    list = taskList;
    // taskList
  } else if (mode === "ongoing") {
    list = filterList;
    // filterList
  } else if (mode === "done") {
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다.
  // all taskList
  // ongoing, done   filterList
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <img src="images/check.png" onClick="toggleComplete('${list[i].id}')"/>
        <button onClick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else if (list[i].isComplete == false) {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
      <img src="images/check.png" onClick="toggleComplete('${list[i].id}')"/>
        <button onClick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
    <img src="images/check.png" alt="Check" class="task-button-img" onClick="toggleComplete('${list[i].id}')"/>
      <button onClick="deleteTask('${list[i].id}')">Delete</button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    //전체리스트를 보여준다.
    render();
  } else if (mode === "ongoing") {
    //진행중인 아이템을 보여준다.
    for (let i = 0; i < list.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    console.log(filterList);
    render();
    //task.iscomplete=false
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    console.log(filterList);
    render();
  }
}

function randomIDGenerate() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase();
}
