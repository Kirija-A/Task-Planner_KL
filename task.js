import Task from "./task-class.js"
import Taskmanager from "./task-manager.js"
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

// Displays todays date
// const options = {weekday : "long", month:"short", day:"numeric"};
// const current = new Date();
// dateElement.innerHTML = current.toLocaleDateString("en-US", options);

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
