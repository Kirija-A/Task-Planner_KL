<<<<<<< HEAD
//show todays date on nav bar
const dateElement = document.getElementById("date");
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//declaration for form, three inpue fields,table display,submit button for store this item and hidden field for id - check for the class and id in the HTML
//console.log used for value verfication
const formTask=document.getElementById("formTask");
const name=document.getElementById("name");
const details=document.getElementById("details");
const assignee=document.getElementById("assignee");
const dueDate=document.getElementById("dueDate");
const status=document.getElementById("status");
const tableBody=document.querySelector("#example");
const submit=document.getElementById("submit");
const formModal=document.getElementById("formModal");
const modalName=document.getElementById("modalName");
const contIdEdit=document.getElementById("contIdEdit");

class Task{
    //constructor for Task
    constructor(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
    }
}
class Taskmanager extends Task{
    constructor(id,name,details,assignee,dueDate,status){
        super(id,name,details,assignee,dueDate,status);
    }
    //show and store task works together like display and store in the local storage
    showData(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
        this.showHtml(this.id,this.name,this.details,this.assignee,this.dueDate,this.status);
        console.log(this.id);
        return this;
    }
    //refresh fields after display or edit
    clearFields(){
        name.value="";
        details.value="";
        dueDate.value="";
    }
    //store the tasks in the local storage
    storeTask(){
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
        const allData=JSON.parse(localStorage.getItem("tasks"))??[];
        allData.push({id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status});
        localStorage.setItem("tasks",JSON.stringify(allData));
    }
    //show the tasks if it in the local storage in the webpage
    showTasks(){
        if(localStorage.getItem("tasks")){
            JSON.parse(localStorage.getItem("tasks")).forEach((item)=>{
                console.log(item);
                this.showHtml(item.id,item.name,item.details,item.assignee,item.dueDate,item.status);
                console.log("going to diaplay");
                console.log(item.id);
            });
        }
    }
    //display in the webpage
    showHtml(id,name,details,assignee,dueDate,status){
        //card display
        console.log("starting to display");
        console.log(id);
        const taskRow=document.createElement("col");
        taskRow.innerHTML=`
        <div class="card mt-4 mr-4" style="width:18rem;">
        <div class="card-header bg-info text-white">Due Date: ${dueDate}</div>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-wrap">Description: ${details}</p>
            <hr>
            <p class="card-text"><strong>Assigned to:</strong> ${assignee}</p>
            <p class="card-text"><strong>Status:</strong> ${status}</p>
            <hr>
            <button id="edit" class="btn btn-info edit mx-4" data-id="${id}"><i class="far fa-edit"></i></button>
            <button id="delete" class="btn btn-danger delete" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
            </div> 
            </div>
      </div>`
      tableBody.appendChild(taskRow);
    }
    //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append
    updateTask(id){
        console.log("hello");
        const newItem={id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status};
        console.log(newItem);
        const updatedData=JSON.parse(localStorage.getItem("tasks")).map((item)=>{
            if(item.id == id){ 
                return newItem;}
            return item;
        });
        console.log(updatedData);
        localStorage.setItem("tasks",JSON.stringify(updatedData));
        window.location.reload();
    }
    //delete from the localstorage
    deleteTask(id){
        let emps=JSON.parse(localStorage.getItem("tasks"));
        let newData=emps.filter(item=>item.id!=id);
        localStorage.setItem("tasks",JSON.stringify(newData));
    }
}

const newTask=new Taskmanager();
newTask.showTasks();

//validate task name
function checkValidName(event){
    if(event.target.value && event.target.value.length >= 8){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task description
function checkValidDesc(event){
    if(event.target.value && event.target.value.length >= 15){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task date
function checkValidDate(event){
    if(event.target.value){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

name.addEventListener("input",checkValidName);
details.addEventListener("input",checkValidDesc);
dueDate.addEventListener("input",checkValidDate);
//contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    //update id checking if new id display it in the new row
    if(!contIdEdit.value){
        console.log("new Employee");
    let id=Math.floor(Math.random()*1000000);
    submit.setAttribute("data-dismiss","modal");
    if(name.value.length<8 || details.value.length<15 ||dueDate.value===""){
        submit.setAttribute("data-dismiss","");
    }else{
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        newTask.storeTask();
        newTask.clearFields();
    }
    }
    //else call the update function and append the item in the html and local storage
    else{
        const id=contIdEdit.value;
        console.log(id);
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        console.log(newTask);
        newTask.updateTask(id);
        submit.innerHTML="Save";
        tableBody.innerHTML="";
        newTask.showTasks();
        newTask.clearFields();
    }
});

//since delete and edit are dynamically generated so it is targeted with the class method 
tableBody.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("delete")){
        let id=e.target.getAttribute("data-id");
        newTask.deleteTask(id);
        e.target.parentElement.parentElement.parentElement.remove();
    console.log("delete");
    }

    else if(e.target.classList.contains("edit")){
        let id=e.target.getAttribute("data-id");
        console.log(id);
        let items=JSON.parse(localStorage.getItem("tasks"));
        console.log(items);
        let newItem=items.find(item=>item.id==id);
        console.log(newItem);
        modalName.innerHTML="Update task";
        $("#formTask").modal("show");
        console.log(newItem.id);
        console.log(newItem.name);
        name.value=newItem.name;
        details.value=newItem.details;
        assignee.value=newItem.assignee;
        dueDate.value=newItem.dueDate;
        status.value=newItem.status;
        contIdEdit.value=id;
        submit.innerHTML="Update";
    }
});
||||||| merged common ancestors
<<<<<<<<< Temporary merge branch 1
//declaration for form, three inpue fields,table display,submit button for store this item and hidden field for id - check for the class and id in the HTML
//console.log used for value verfication
const formTask=document.getElementById("formTask");
const name=document.getElementById("name");
const details=document.getElementById("details");
const assignee=document.getElementById("assignee");
const dueDate=document.getElementById("dueDate");
const status=document.getElementById("status");
const tableBody=document.querySelector("#example");
const submit=document.getElementById("submit");
const formModal=document.getElementById("formModal");
const modalName=document.getElementById("modalName");
const contIdEdit=document.getElementById("contIdEdit");

class Task{
    //constructor for Task
    constructor(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
    }
}
class Taskmanager extends Task{
    constructor(id,name,details,assignee,dueDate,status){
        super(id,name,details,assignee,dueDate,status);
    }
    //show and store task works together like display and store in the local storage
    showData(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
        this.showHtml(this.id,this.name,this.details,this.assignee,this.dueDate,this.status);
        console.log(this.id);
        return this;
    }
    //refresh fields after display or edit
    clearFields(){
        name.value="";
        details.value="";
        dueDate.value="";
    }
    //store the tasks in the local storage
    storeTask(){
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
        const allData=JSON.parse(localStorage.getItem("tasks"))??[];
        allData.push({id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status});
        localStorage.setItem("tasks",JSON.stringify(allData));
    }
    //show the tasks if it in the local storage in the webpage
    showTasks(){
        if(localStorage.getItem("tasks")){
            JSON.parse(localStorage.getItem("tasks")).forEach((item)=>{
                console.log(item);
                this.showHtml(item.id,item.name,item.details,item.assignee,item.dueDate,item.status);
                console.log("going to diaplay");
                console.log(item.id);
            });
        }
    }
    //display in the webpage
    showHtml(id,name,details,assignee,dueDate,status){
        //card display
        console.log("starting to display");
        console.log(id);
        const taskRow=document.createElement("col");
        taskRow.innerHTML=`
        <div class="card mt-4 mr-4" style="width:18rem;">
        <div class="card-header bg-info text-white">Due Date: ${dueDate}</div>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-wrap">Description: ${details}</p>
            <hr>
            <p class="card-text"><strong>Assigned to:</strong> ${assignee}</p>
            <p class="card-text"><strong>Status:</strong> ${status}</p>
            <hr>
            <button id="edit" class="btn btn-info edit mx-4" data-id="${id}"><i class="far fa-edit"></i></button>
            <button id="delete" class="btn btn-danger delete" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
            </div> 
            </div>
      </div>`
      tableBody.appendChild(taskRow);
    }
    //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append
    updateTask(id){
        console.log("hello");
        const newItem={id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status};
        console.log(newItem);
        const updatedData=JSON.parse(localStorage.getItem("tasks")).map((item)=>{
            if(item.id == id){ 
                return newItem;}
            return item;
        });
        console.log(updatedData);
        localStorage.setItem("tasks",JSON.stringify(updatedData));
        window.location.reload();
    }
    //delete from the localstorage
    deleteTask(id){
        let emps=JSON.parse(localStorage.getItem("tasks"));
        let newData=emps.filter(item=>item.id!=id);
        localStorage.setItem("tasks",JSON.stringify(newData));
    }
}

const newTask=new Taskmanager();
newTask.showTasks();

//validate task name
function checkValidName(event){
    if(event.target.value && event.target.value.length >= 8){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task description
function checkValidDesc(event){
    if(event.target.value && event.target.value.length >= 15){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task date
function checkValidDate(event){
    if(event.target.value){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

name.addEventListener("input",checkValidName);
details.addEventListener("input",checkValidDesc);
dueDate.addEventListener("input",checkValidDate);
//contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    //update id checking if new id display it in the new row
    if(!contIdEdit.value){
        console.log("new Employee");
    let id=Math.floor(Math.random()*1000000);
    submit.setAttribute("data-dismiss","modal");
    if(name.value.length<8 || details.value.length<15 ||dueDate.value===""){
        submit.setAttribute("data-dismiss","");
    }else{
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        newTask.storeTask();
        newTask.clearFields();
    }
    }
    //else call the update function and append the item in the html and local storage
    else{
        const id=contIdEdit.value;
        console.log(id);
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        console.log(newTask);
        newTask.updateTask(id);
        submit.innerHTML="Save";
        tableBody.innerHTML="";
        newTask.showTasks();
        newTask.clearFields();
    }
});

//since delete and edit are dynamically generated so it is targeted with the class method 
tableBody.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("delete")){
        let id=e.target.getAttribute("data-id");
        newTask.deleteTask(id);
        e.target.parentElement.parentElement.parentElement.remove();
    console.log("delete");
    }

    else if(e.target.classList.contains("edit")){
        let id=e.target.getAttribute("data-id");
        console.log(id);
        let items=JSON.parse(localStorage.getItem("tasks"));
        console.log(items);
        let newItem=items.find(item=>item.id==id);
        console.log(newItem);
        modalName.innerHTML="Update task";
        $("#formTask").modal("show");
        console.log(newItem.id);
        console.log(newItem.name);
        name.value=newItem.name;
        details.value=newItem.details;
        assignee.value=newItem.assignee;
        dueDate.value=newItem.dueDate;
        status.value=newItem.status;
        contIdEdit.value=id;
        submit.innerHTML="Update";
    }
});
||||||||| merged common ancestors
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
  
  }

  //Building the column for the table
  function buildColumn() {
    let col = document.createElement("td");
    col.setAttribute("scope", "col");
    return col;
  }
  
  //badge for the assignee
  function buildBadge(text, badgeClass = "text-secondary") {
    let badge = document.createElement("span");
    badge.classList.add("text");
    badge.classList.add(badgeClass);
    badge.innerHTML = text;
    return badge;
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
  
      col3.appendChild(buildBadge(this.assignee));
  
      // add to the row
      newTaskRow.appendChild(col3);
  
      // create the due date column
      let col4 = buildColumn();
  
      let dueDateBadge;
  
      let taskDate = new Date(this.duedate);
  
      let currentDate = new Date();
  
      // compare the task due date to the current date
      if (
        taskDate.getFullYear() == currentDate.getFullYear() &&
        taskDate.getMonth() == currentDate.getMonth() &&
        taskDate.getDate() == currentDate.getDate()
      ) {
        // task due today, set due date badge color to yellow
  
        dueDateBadge = buildBadge(this.duedate, "badge-warning");
      } else if (taskDate.getTime() < currentDate.getTime()) {
        // task overdue at least 1 day, set due date badge color to red
        dueDateBadge = buildBadge(this.duedate, "badge-danger");
  
        if (this.status == "Not started") {
          // task status is not completed or in progress, switch task status to overdue
          this.status = "Overdue";
        }
      } else {
        // task is due in the future, set due date badge color to grey
        dueDateBadge = buildBadge(this.duedate);
      }
  
      col4.appendChild(dueDateBadge);
  
      // add to the row
      newTaskRow.appendChild(col4);
  
      // create the task status column
      let col5 = buildColumn();
  
      let statusBadge =buildBadge(this.status);;
  
      // add task status badge to the column
      col5.appendChild(statusBadge);
  
      // add task status column to the row
      newTaskRow.appendChild(col5);
  
      // create the detail / edit button column
      let col6 = buildColumn();
  
      // create the drop down detail button
      let detailBadge = buildBadge("Details");
      detailBadge.classList.add("dropdown-toggle", "mx-1");
  
      // link the drop down detail button to the collapsible detail row
      detailBadge.setAttribute("data-toggle", "collapse");
      detailBadge.setAttribute("data-target", "#" + this.detailId);
  
      //add the detail button to the column
      col6.appendChild(detailBadge);
  
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
      modalAssigneeInput.value = "Myself";
      modalDateInput.value = null;
      modalStatusInput.value = "Not started";
  
      modalTaskNameInput.classList.toggle("is-valid");
      modalTaskDetailInput.classList.toggle("is-valid");
      modalDateInput.classList.toggle("is-valid");
      modalTaskNameInput.classList.toggle("is-invalid");
      modalTaskDetailInput.classList.toggle("is-invalid");
      modalDateInput.classList.toggle("is-invalid");
  
      taskManager.buildTaskTable();
    }
  };

let deletebutton = document.querySelector("#deletebutton");
deletebutton.addEventListener("click", deleteButtonClick);
=========
//show todays date
const dateElement = document.getElementById("date");
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//declaration for form, three inpue fields,table display,submit button for store this item and hidden field for id - check for the class and id in the HTML
//console.log used for value verfication
const formTask=document.getElementById("formTask");
const name=document.getElementById("name");
const details=document.getElementById("details");
const assignee=document.getElementById("assignee");
const dueDate=document.getElementById("dueDate");
const status=document.getElementById("status");
const tableBody=document.querySelector("#example");
const submit=document.getElementById("submit");
const formModal=document.getElementById("formModal");
const modalName=document.getElementById("modalName");
const contIdEdit=document.getElementById("contIdEdit");

class Task{
    //constructor for Task
    constructor(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
    }
}
class Taskmanager extends Task{
    constructor(id,name,details,assignee,dueDate,status){
        super(id,name,details,assignee,dueDate,status);
    }
    //show and store task works together like display and store in the local storage
    showData(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
        this.showHtml(this.id,this.name,this.details,this.assignee,this.dueDate,this.status);
        console.log(this.id);
        return this;
    }
    //refresh fields after display or edit
    clearFields(){
        name.value="";
        details.value="";
        dueDate.value="";
    }
    //store the tasks in the local storage
    storeTask(){
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
        const allData=JSON.parse(localStorage.getItem("tasks"))??[];
        allData.push({id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status});
        localStorage.setItem("tasks",JSON.stringify(allData));
    }
    //show the tasks if it in the local storage in the webpage
    showTasks(){
        if(localStorage.getItem("tasks")){
            JSON.parse(localStorage.getItem("tasks")).forEach((item)=>{
                console.log(item);
                this.showHtml(item.id,item.name,item.details,item.assignee,item.dueDate,item.status);
                console.log("going to diaplay");
                console.log(item.id);
            });
        }
    }
    //display in the webpage
    showHtml(id,name,details,assignee,dueDate,status){
        //card display
        console.log("starting to display");
        console.log(id);
        const taskRow=document.createElement("col");
        taskRow.innerHTML=`
        <div class="card mt-4 mr-4" style="width:18rem;">
        <div class="card-header bg-info text-white">Due Date: ${dueDate}</div>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-wrap">Description: ${details}</p>
            <hr>
            <p class="card-text"><strong>Assigned to:</strong> ${assignee}</p>
            <p class="card-text"><strong>Status:</strong> ${status}</p>
            <hr>
            <button id="edit" class="btn btn-info edit mx-4" data-id="${id}"><i class="far fa-edit"></i></button>
            <button id="delete" class="btn btn-danger delete" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
            </div> 
            </div>
      </div>`
      tableBody.appendChild(taskRow);
    }
    //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append
    updateTask(id){
        console.log("hello");
        const newItem={id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status};
        console.log(newItem);
        const updatedData=JSON.parse(localStorage.getItem("tasks")).map((item)=>{
            if(item.id == id){ 
                return newItem;}
            return item;
        });
        console.log(updatedData);
        localStorage.setItem("tasks",JSON.stringify(updatedData));
        window.location.reload();
    }
    //delete from the localstorage
    deleteTask(id){
        let emps=JSON.parse(localStorage.getItem("tasks"));
        let newData=emps.filter(item=>item.id!=id);
        localStorage.setItem("tasks",JSON.stringify(newData));
    }
}

const newTask=new Taskmanager();
newTask.showTasks();

//validate task name
function checkValidName(event){
    if(event.target.value && event.target.value.length >= 8){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task description
function checkValidDesc(event){
    if(event.target.value && event.target.value.length >= 15){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

//validate task date
function checkValidDate(event){
    if(event.target.value){
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
    }else{
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
    }
}

name.addEventListener("input",checkValidName);
details.addEventListener("input",checkValidDesc);
dueDate.addEventListener("input",checkValidDate);
//contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    //update id checking if new id display it in the new row
    if(!contIdEdit.value){
        console.log("new Employee");
    let id=Math.floor(Math.random()*1000000);
    submit.setAttribute("data-dismiss","modal");
    if(name.value.length<8 || details.value.length<15 ||dueDate.value===""){
        submit.setAttribute("data-dismiss","");
    }else{
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        newTask.storeTask();
        newTask.clearFields();
    }
    }
    //else call the update function and append the item in the html and local storage
    else{
        const id=contIdEdit.value;
        console.log(id);
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        name.classList.toggle("is-valid");
        details.classList.toggle("is-valid");    
        dueDate.classList.toggle("is-valid");
        name.classList.toggle("is-invalid");
        details.classList.toggle("is-invalid");
        dueDate.classList.toggle("is-invalid");
        console.log(newTask);
        newTask.updateTask(id);
        submit.innerHTML="Save";
        tableBody.innerHTML="";
        newTask.showTasks();
        newTask.clearFields();
    }
});

//since delete and edit are dynamically generated so it is targeted with the class method 
tableBody.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("delete")){
        let id=e.target.getAttribute("data-id");
        newTask.deleteTask(id);
        e.target.parentElement.parentElement.parentElement.remove();
    console.log("delete");
    }

    else if(e.target.classList.contains("edit")){
        let id=e.target.getAttribute("data-id");
        console.log(id);
        let items=JSON.parse(localStorage.getItem("tasks"));
        console.log(items);
        let newItem=items.find(item=>item.id==id);
        console.log(newItem);
        modalName.innerHTML="Update task";
        $("#formTask").modal("show");
        console.log(newItem.id);
        console.log(newItem.name);
        name.value=newItem.name;
        details.value=newItem.details;
        assignee.value=newItem.assignee;
        dueDate.value=newItem.dueDate;
        status.value=newItem.status;
        contIdEdit.value=id;
        submit.innerHTML="Update";
    }
});
>>>>>>>>> Temporary merge branch 2
=======
//show todays date
import Task from "./taskclass.js"
import Taskmanager from "./taskmanager.js"
const formTask=document.getElementById("formTask");
const name=document.getElementById("name");
const details=document.getElementById("details");
const assignee=document.getElementById("assignee");
const dueDate=document.getElementById("dueDate");
const status=document.getElementById("status");
const tableBody=document.querySelector("#example");
const submit=document.getElementById("submit");
const formModal=document.getElementById("formModal");
const modalName=document.getElementById("modalName");
const contIdEdit=document.getElementById("contIdEdit");
const errormsg=document.getElementById("errormsg");
const errorMsg1 = document.querySelector("#errorMsg1");
const errorMsg2 = document.querySelector("#errorMsg2");
const errorMsg3 = document.querySelector("#errorMsg3");
const errorMsg4 = document.querySelector("#errorMsg4");
const dateElement = document.getElementById("#date");
const todo=document.querySelector("#todo");
const progress=document.querySelector("#progress");
const review=document.querySelector("#review");
const done=document.querySelector("#done");
const overdue=document.querySelector("#overdue");
const allDisplay=document.querySelector("#alldisplay");
const formCancel=document.querySelector("#formCancel");
let d=new Date();
let today=[
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
dueDate.value=today;
// const options = {weekday : "long", month:"short", day:"numeric"};
// const today = new Date();
// dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//declaration for form, three inpue fields,table display,submit button for store this item and hidden field for id - check for the class and id in the HTML

//console.log used for value verfication

// //contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

const newTask=new Taskmanager();
newTask.displayTask();

name.addEventListener("input", function(event) {
    event.preventDefault();
    if (event.target.value && event.target.value.length <= 8 || event.target.value.length ==0) {
      errorMsg1.innerHTML = "Mandatory must enter 8 characters of length";
      errorMsg1.style.color = "red";
      name.focus();
      submit.disabled=true;
    } else {
        errorMsg1.innerHTML = "Looks Good!";
        errorMsg1.style.color = "purple";
        submit.disabled=false;
    }
  });
  details.addEventListener("input", function(event) {
    event.preventDefault();
    if (event.target.value && event.target.value.length <= 15 || event.target.value.length ==0) {
      errorMsg2.innerHTML = "Mandatory must enter 15 characters of length";
      errorMsg2.style.color = "red";
      details.focus();
      submit.disabled=true;
    } else {
        errorMsg2.innerHTML = "Looks Good!";
        errorMsg2.style.color = "purple";
        submit.disabled=false;        
    }
  });
  dueDate.addEventListener("change", function(event) {
    event.preventDefault();
    errorMsg3.innerHTML = "Looks Good!";
    errorMsg3.style.color = "green";
    dueDate.focus();
    statusValue();
  });
  function statusValue(){
    if(dueDate.value<today){
        errorMsg4.innerHTML = "Status changed to overdue";
        errorMsg4.style.color = "green";
        status.value="overdue";
      }
      else{
          errorMsg4.innerHTML="";
          status.value="To Do";
      }
  }
  status.addEventListener("change",function(event){
    statusValue();
  });

  function clearError() {
    errorMsg1.innerHTML = "";
    errorMsg2.innerHTML = "";
    errorMsg3.innerHTML = "";
    errorMsg4.innerHTML = "";
  }

formCancel.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.clearFields();
    clearError();
});
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    //update id checking if new id display it in the new row
    if(!contIdEdit.value){
            let id=Math.floor(Math.random()*1000000);
            newTask.addTask(id,name.value,details.value,assignee.value,dueDate.value,status.value);
            newTask.storeTask();
            newTask.clearFields();
            clearError();
    // }
    }
    //else call the update function and append the item in the html and local storage
    else{
        const id=contIdEdit.value;
        newTask.addTask(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        newTask.updateTask(id);
        contIdEdit.value="";
        // newTask.refresh();
        submit.innerHTML="Save";
        tableBody.innerHTML="";
        newTask.displayTask();
        newTask.clearFields();
        clearError();
    }
});

//since delete and edit are dynamically generated so it is targeted with the class method 
tableBody.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("delete")){
        let id=e.target.getAttribute("data-id");
        newTask.deleteTask(id);
        e.target.parentElement.parentElement.parentElement.remove();
    }

    else if(e.target.classList.contains("edit")){
        let id=e.target.getAttribute("data-id");
        let items=JSON.parse(localStorage.getItem("tasks"));
        let newItem=items.find(item=>item.id==id);
        modalName.innerHTML="Update task";
        modalName.disabled=true;
        $("#formTask").modal("show");
        name.value=newItem.name;
        details.value=newItem.details;
        assignee.value=newItem.assignee;
        dueDate.value=newItem.dueDate;
        status.value=newItem.status;
        contIdEdit.value=id;
        submit.innerHTML="Update";
    }
});

allDisplay.addEventListener("click",(e)=>{
    e.preventDefault();
    tableBody.innerHTML="";
    newTask.displayTask();
});
todo.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.displayFilter("To Do");
});
progress.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.displayFilter("In progress");
});
review.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.displayFilter("review");
});
done.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.displayFilter("Done");
});
overdue.addEventListener("click",(e)=>{
    e.preventDefault();
    newTask.displayFilter("overdue");
});
>>>>>>> 789c2a0ac79b63530edde0d20443f6336f4acd1f
