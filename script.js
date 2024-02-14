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
let taskList = [];
let mode = "all";
let filterList = [];
let list = [];
addButton.addEventListener("click", addTask);

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
        <button onClick="toggleComplete('${list[i].id}')">Check</button>
        <button onClick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else if (list[i].isComplete == false) {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onClick="toggleComplete('${list[i].id}')">Check</button>
        <button onClick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onClick="toggleComplete('${list[i].id}')">Check</button>
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
