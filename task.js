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
const errormsg=document.getElementById("errormsg");
const errorMsg1 = document.querySelector("#errorMsg1");
const errorMsg2 = document.querySelector("#errorMsg2");
const errorMsg3 = document.querySelector("#errorMsg3");

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
                console.log("going to display");
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
            <button id="edit" class="btn btn-info edit mx-4" data-id="${id}">Edit</button>
            <button id="delete" class="btn btn-danger delete" data-id="${id}">Delete</button>
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

// //contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    //update id checking if new id display it in the new row
    if(!contIdEdit.value){
        console.log("new Task");
         let id=Math.floor(Math.random()*1000000);
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        newTask.storeTask();
        newTask.clearFields();
        clearError();
    // }
    }
    //else call the update function and append the item in the html and local storage
    else{
        const id=contIdEdit.value;
        console.log(id);
        newTask.showData(id,name.value,details.value,assignee.value,dueDate.value,status.value);
        console.log(newTask);
        newTask.updateTask(id);
        submit.innerHTML="Save";
        tableBody.innerHTML="";
        newTask.showTasks();
        newTask.clearFields();
    }
});

name.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      errorMsg1.innerHTML = "Mandatory must enter 8 characters of length";
      errorMsg1.style.color = "red";
      name.focus();
      checkValidName = false;
    } else {
        errorMsg1.innerHTML = "Looks Good!";
        errorMsg1.style.color = "purple";
        checkValidName = true;
    }
  });
  details.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 25) {
      errorMsg2.innerHTML = "Mandatory must enter 25 characters of length";
      errorMsg2.style.color = "red";
      details.focus();
      checkValidDesc = false;
      
    } else {
        errorMsg2.innerHTML = "Looks Good!";
        errorMsg2.style.color = "purple";
        checkValidDesc = true;
    }
  });
  dueDate.addEventListener("change", function(event) {
    if (event.target.value == "dd/mm/yyyy") {
      //errorMsg1.innerHTML = "";
      errorMsg3.innerHTML = "Please select a valid date."
      errorMsg3.style.color = "red";
      dueDate.focus();
      checkValidDate = false;
    } else {
        errorMsg3.innerHTML = "Looks Good!";
        errorMsg3.style.color = "green";
        checkValidDate = true;
    }
  });

  function clearError() {
    errorMsg1.innerHTML = "";
    errorMsg2.innerHTML = "";
    errorMsg3.innerHTML = "";
  }
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
=
