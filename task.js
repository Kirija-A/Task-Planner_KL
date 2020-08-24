//show todays date
const dateElement = document.getElementById("date");
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Create the task list object array

// class TaskManager {
//     constructor(parent) {
//       this.tasks = [];
//       this.currentId = 1;
//       this.parent = parent;
//     }
  
//     addTask(name, details, assignee, duedate, status) {
//       const task = new Task(
//         this.currentId++,
//         name,
//         details,
//         assignee,
//         duedate,
//         status
//       );
  
//       this.tasks.push(task);
//     }
  
//     buildTaskTable() {
//       let taskTableBody = document.querySelector("#taskTableBody");
  
//       taskTableBody.innerHTML = "";
  
//       this.tasks.forEach((task) => {
//         task.buildTask(taskTableBody);
//       });
//     }
  
//   }

  //Building the column for the table
  // function buildColumn() {
  //   let col = document.createElement("td");
  //   col.setAttribute("scope", "col");
  //   return col;
  // }
  
  //badge for the assignee
  // function buildBadge(text, badgeClass = "text-secondary") {
  //   let badge = document.createElement("span");
  //   badge.classList.add("text");
  //   badge.classList.add(badgeClass);
  //   badge.innerHTML = text;
  //   return badge;
  // }
  
  // class Task {
  //   constructor(id, name, details, assignee, duedate, status) {
  //     this.id = id;
  //     this.detailId = "d" + id;
  //     this.name = name;
  //     this.details = details;
  //     this.assignee = assignee;
  //     this.duedate = duedate;
  //     this.status = status;
  //   }
  
    // buildTask(parentElement) {
    //   let newTaskRow = document.createElement("tr");
  
      // create the checkbox column
      // let col1 = buildColumn();
      // let input = document.createElement("input");
      // input.setAttribute("type", "checkbox");
      // input.setAttribute("data-id", this.id);
  
      // input.classList.add("checkbox");
      // col1.appendChild(input);
  
      //add to the row
      //newTaskRow.appendChild(col1);
  
      // create the task name column
      // let col2 = buildColumn();
      // col2.innerHTML = this.name;
  
      // add to the row
      //newTaskRow.appendChild(col2);
  
      // create the task assignee column
      // let col3 = buildColumn();
  
      // col3.appendChild(buildBadge(this.assignee));
  
      // add to the row
      //newTaskRow.appendChild(col3);
  
      // create the due date column
      // let col4 = buildColumn();
  
      // let dueDateBadge;
  
      // let taskDate = new Date(this.duedate);
  
      // let currentDate = new Date();
  
      // compare the task due date to the current date
      // if (
      //   taskDate.getFullYear() == currentDate.getFullYear() &&
      //   taskDate.getMonth() == currentDate.getMonth() &&
      //   taskDate.getDate() == currentDate.getDate()
      // ) {
        // task due today, set due date badge color to yellow
  
      //   dueDateBadge = buildBadge(this.duedate, "badge-warning");
      // } else if (taskDate.getTime() < currentDate.getTime()) {
      //   // task overdue at least 1 day, set due date badge color to red
        // dueDateBadge = buildBadge(this.duedate, "badge-danger");
  
        // if (this.status == "Not started") {
          // task status is not completed or in progress, switch task status to overdue
      //     this.status = "Overdue";
      //   }
      // } else {
        // task is due in the future, set due date badge color to grey
      //   dueDateBadge = buildBadge(this.duedate);
      // }
  
      //col4.appendChild(dueDateBadge);
  
      // add to the row
      //newTaskRow.appendChild(col4);
  
      // create the task status column
      //let col5 = buildColumn();
  
      //let statusBadge =buildBadge(this.status);;
  
      // add task status badge to the column
      //col5.appendChild(statusBadge);
  
      // add task status column to the row
      //newTaskRow.appendChild(col5);
  
      // create the detail / edit button column
      //let col6 = buildColumn();
  
      // create the drop down detail button
      // let detailBadge = buildBadge("Details");
      // detailBadge.classList.add("dropdown-toggle", "mx-1");
  
      // link the drop down detail button to the collapsible detail row
      // detailBadge.setAttribute("data-toggle", "collapse");
      // detailBadge.setAttribute("data-target", "#" + this.detailId);
  
      //add the detail button to the column
      //col6.appendChild(detailBadge);
  
      // add the buttons column to the row
      //newTaskRow.appendChild(col6);
  
      //create a new task detail row
      // var newTaskDetailRow = document.createElement("tr");
  
      // newTaskDetailRow.setAttribute("id", this.detailId);
      // newTaskDetailRow.classList.add("bg-light", "collapse");
      // newTaskDetailRow.setAttribute("data-parent", "#taskTableBody");
  
      // create a blank column
//       let col7 = buildColumn();
  
//       //add to the row
//       newTaskDetailRow.appendChild(col7);
  
//       // create the task detail column
//       let col8 = buildColumn();
//       col8.setAttribute("colspan", "5");
//       col8.innerHTML = this.details;
  
//       // add to the row
//       newTaskDetailRow.appendChild(col8);
  
//       parentElement.appendChild(newTaskRow);
//       parentElement.appendChild(newTaskDetailRow);
//     }
//   }
  
//   const taskManager = new TaskManager();

//  // get the add task modal elements
//   let modalButton = document.getElementById("addTaskModalButton");
//   let modalTaskNameInput = document.getElementById("taskNameInput");
//   modalTaskNameInput.classList.add("is-invalid");
//   let modalTaskDetailInput = document.getElementById("detailInput");
//   modalTaskDetailInput.classList.add("is-invalid");
//   let modalAssigneeInput = document.getElementById("assigneeSelect");
//   let modalDateInput = document.getElementById("dueDateInput");
//   modalDateInput.classList.add("is-invalid");
//   let modalStatusInput = document.getElementById("statusSelect");
  
//   // validate task name input of modal
//   function checkIfValidName(event) {
//     if (event.target.value && event.target.value.length >= 8) {
//       event.target.classList.remove("is-invalid");
//       event.target.classList.add("is-valid");
//     } else {
//       event.target.classList.remove("is-valid");
//       event.target.classList.add("is-invalid");
//     }
//   }
  
//   //validate task description input of modal
//   function checkIfValidDesc(event) {
//     if (event.target.value && event.target.value.length >= 15) {
//       event.target.classList.remove("is-invalid");
//       event.target.classList.add("is-valid");
//     } else {
//       event.target.classList.remove("is-valid");
//       event.target.classList.add("is-invalid");
//     }
//   }
  
//   //validate task due date input of modal
//   function checkIfValidDate(event) {
//     if (event.target.value) {
//       event.target.classList.remove("is-invalid");
//       event.target.classList.add("is-valid");
//     } else {
//       event.target.classList.remove("is-valid");
//       event.target.classList.add("is-invalid");
//     }
//   }
  
//   modalTaskNameInput.addEventListener("input", checkIfValidName);
//   modalTaskDetailInput.addEventListener("input", checkIfValidDesc);
//   modalDateInput.addEventListener("input", checkIfValidDate);
  
  // // add a new task and refresh the task table when the modal is submitted
  // modalButton.onclick = function () {
  //   modalButton.setAttribute("data-dismiss", "modal");
  //   if (
  //     modalTaskNameInput.value.length < 8 ||
  //     modalTaskDetailInput.value.length < 15 ||
  //     modalDateInput.value === ""
  //   ) {
  //     modalButton.setAttribute("data-dismiss", "");
  //   } else {
  //     taskManager.addTask(
  //       modalTaskNameInput.value,
  //       modalTaskDetailInput.value,
  //       modalAssigneeInput.value,
  //       modalDateInput.value,
  //       modalStatusInput.value
  //     );
  
  //     modalTaskNameInput.value = null;
  //     modalTaskDetailInput.value = null;
  //     modalAssigneeInput.value = "Myself";
  //     modalDateInput.value = null;
  //     modalStatusInput.value = "Not started";
  
  //     modalTaskNameInput.classList.toggle("is-valid");
  //     modalTaskDetailInput.classList.toggle("is-valid");
  //     modalDateInput.classList.toggle("is-valid");
  //     modalTaskNameInput.classList.toggle("is-invalid");
  //     modalTaskDetailInput.classList.toggle("is-invalid");
  //     modalDateInput.classList.toggle("is-invalid");
  
  //     taskManager.buildTaskTable();
  //   }
  // };

//let deletebutton = document.querySelector("#deletebutton");
//deletebutton.addEventListener("click", deleteButtonClick);

  
let deletebutton = document.querySelector("#deletebutton");
let editbutton=document.querySelector("#editbutton");
 // Create the task list object array

class TaskManager {
    constructor(parent) {
      this.tasks = [];
      this.currentId = 1;
      this.parent = parent;
    }
  
    addTask(name, details, assignee, duedate, status) {
      const task = new Task(
        this.currentId++,
        name,
        details,
        assignee,
        duedate,
        status
      );
  
      this.tasks.push(task);
    }
  
    buildTaskTable() {
      let taskTableBody = document.querySelector("#taskTableBody");
  
      taskTableBody.innerHTML = "";
  
      this.tasks.forEach((task) => {
        task.buildTask(taskTableBody);
      });
    }
    deleteTask(id){
      this.tasks = this.tasks.filter((task) => task.id != id);
    }
  }

  //Building the column for the table
  function buildColumn() {
    let col = document.createElement("td");
    col.setAttribute("scope", "col");
    return col;
  }
  
  //Text for the details
  function buildText(text, textClass = "text-secondary") {
    let textElement = document.createElement("span");
    textElement.classList.add("text");
    textElement.classList.add(textClass);
    textElement.innerHTML = text;
    return textElement;
  }
  
  class Task {
    constructor(id, name, details, assignee, duedate, status) {
      this.id = id;
      this.detailId = "d" + id;
      this.name = name;
      this.details = details;
      this.assignee = assignee;
      this.duedate = duedate;
      this.status = status;
    }
  
    buildTask(parentElement) {
      let newTaskRow = document.createElement("tr");
  
      // create the checkbox column
      let col1 = buildColumn();
      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("data-id", this.id);
  
      input.classList.add("checkbox");
      col1.appendChild(input);  
      //add to the row
      newTaskRow.appendChild(col1);

      // create the task name column
      let col2 = buildColumn();
      col2.innerHTML = this.name;  
      // add to the row
      newTaskRow.appendChild(col2);
  
      // create the task assignee column
      let col3 = buildColumn();
      col3.innerHTML=this.assignee;  
      // add to the row
      newTaskRow.appendChild(col3);
  
      // create the due date column
      let col4 = buildColumn();
      col4.innerHTML=this.duedate;
      // add to the row
      newTaskRow.appendChild(col4);
  
      // create the task status column
      let col5 = buildColumn();
      col5.innerHTML=this.status;
      // add task status column to the row
      newTaskRow.appendChild(col5);
  
      // create the detail / edit button column
      let col6 = buildColumn();
  
      // create the drop down detail button
      let detailText = buildText("Details");
      detailText.classList.add("dropdown-toggle", "mx-1");
  
      // link the drop down detail button to the collapsible detail row
      detailText.setAttribute("data-toggle", "collapse");
      detailText.setAttribute("data-target", "#" + this.detailId);
  
      //add the detail button to the column
      col6.appendChild(detailText);
  
      // add the buttons column to the row
      newTaskRow.appendChild(col6);
  
      //create a new task detail row
      var newTaskDetailRow = document.createElement("tr");
  
      newTaskDetailRow.setAttribute("id", this.detailId);
      newTaskDetailRow.classList.add("bg-light", "collapse");
      newTaskDetailRow.setAttribute("data-parent", "#taskTableBody");
  
      // create a blank column
      let col7 = buildColumn();
      //add to the row
      newTaskDetailRow.appendChild(col7);
  
      // create the task detail column
      let col8 = buildColumn();
      col8.setAttribute("colspan", "5");
      col8.innerHTML = this.details;
      // add to the row
      newTaskDetailRow.appendChild(col8);
  
      parentElement.appendChild(newTaskRow);
      parentElement.appendChild(newTaskDetailRow);
    }
  }
  
  const taskManager = new TaskManager();

 // get the add task modal elements
  let modalButton = document.getElementById("addTaskModalButton");
  let modalTaskNameInput = document.getElementById("taskNameInput");
  modalTaskNameInput.classList.add("is-invalid");
  let modalTaskDetailInput = document.getElementById("detailInput");
  modalTaskDetailInput.classList.add("is-invalid");
  let modalAssigneeInput = document.getElementById("assigneeSelect");
  let modalDateInput = document.getElementById("dueDateInput");
  modalDateInput.classList.add("is-invalid");
  let modalStatusInput = document.getElementById("statusSelect");
  
  // validate task name input of modal
  function checkIfValidName(event) {
    if (event.target.value && event.target.value.length >= 8) {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }
  }
  
  //validate task description input of modal
  function checkIfValidDesc(event) {
    if (event.target.value && event.target.value.length >= 15) {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }
  }
  
  //validate task due date input of modal
  function checkIfValidDate(event) {
    if (event.target.value) {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }
  }
  
  modalTaskNameInput.addEventListener("input", checkIfValidName);
  modalTaskDetailInput.addEventListener("input", checkIfValidDesc);
  modalDateInput.addEventListener("input", checkIfValidDate);
  
  // add a new task and refresh the task table when the modal is submitted
  modalButton.onclick = function () {
    modalButton.setAttribute("data-dismiss", "modal");
    if (
      modalTaskNameInput.value.length < 8 ||
      modalTaskDetailInput.value.length < 15 ||
      modalDateInput.value === ""
    ) {
      modalButton.setAttribute("data-dismiss", "");
    } else {
      taskManager.addTask(
        modalTaskNameInput.value,
        modalTaskDetailInput.value,
        modalAssigneeInput.value,
        modalDateInput.value,
        modalStatusInput.value
      );
  
      modalTaskNameInput.value = null;
      modalTaskDetailInput.value = null;
      modalAssigneeInput.value = "Kirija";
      modalDateInput.value = null;
      modalStatusInput.value = "To Do";
  
      modalTaskNameInput.classList.toggle("is-valid");
      modalTaskDetailInput.classList.toggle("is-valid");
      modalDateInput.classList.toggle("is-valid");
      modalTaskNameInput.classList.toggle("is-invalid");
      modalTaskDetailInput.classList.toggle("is-invalid");
      modalDateInput.classList.toggle("is-invalid");
  
      taskManager.buildTaskTable();
    }
  };

  deleteButtonClick = function () {
    let checkBoxList = document.getElementsByClassName("checkbox");
    for (let i = 0; i < checkBoxList.length; i++) {
      if (checkBoxList[i].checked == true) {
        let id = checkBoxList[i].getAttribute("data-id");
        taskManager.deleteTask(id);
      }
    }
    taskManager.buildTaskTable();
  };
deletebutton.addEventListener("click", deleteButtonClick);

editButtonClick = function () {
  let checkBoxList = document.getElementsByClassName("checkbox");
  for (let i = 0; i < checkBoxList.length; i++) {
    if (checkBoxList[i].checked == true) {
      let id = checkBoxList[i].getAttribute("data-id");
      taskManager.editTask(id);
    }
  }
  taskManager.buildTaskTable();
};
editbutton.addEventListener("click", editButtonClick);

const editButtons = document.querySelectorAll(".editButton");