let addbtn = document.querySelector("#addBtn");

addbtn.onclick = function(){
    let taskName = document.querySelector("#taskName");
    let nmErrMsg = document.querySelector("#nmErrMsg");
    

    if(taskName.value == "" || taskName.value.length <= 8)
    {
        //alert("here");
        nmErrMsg.innerHTML = "Mandatory must enter 8 characters of length";
        nmErrMsg.style.color = "red";
        taskName.style.borderColor = "orange";
        
    } else{
        //alert("else");
        nmErrMsg.innerHTML = "Looks good!";
        nmErrMsg.style.color = "violet";
        
    }
    if(taskDesc.value == "" || taskDesc.value.length <= 15)
    {
        //alert("here");
        nmErrMsg1.innerHTML = "Mandatory must enter 25 characters of length";
        nmErrMsg1.style.color = "red";
        taskDesc.style.borderColor = "orange";
        
    } else{
        alert("else");
        nmErrMsg1.innerHTML = "Looks good!";
        nmErrMsg1.style.color = "violet";
        
    }
}
