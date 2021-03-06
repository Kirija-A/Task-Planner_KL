import TaskManager from "./task-manager.js";


import path from "path";
import fs from "fs";
import Taskmanager from "./taskmanager.js";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");


beforeEach(() =>{ //sets up the DOM
    localStorage.clear();
    document.documentElement.innerHTML = html.toString();
});

//Add task
test("Task Add", () => {
    const newTask = new TaskManager();
    newTask.addTask("1", "Project", "Project Completion", "Lakshman", "28/08/2020", "To Do");
    newTask.storeTask();
    expect(newTask.id).toBe("1");
    expect(newTask.name).toBe("Project");
    expect(newTask.details).toBe("Project Completion");
    expect(newTask.assignee).toBe("Lakshman");
    expect(newTask.dueDate).toBe("28/08/2020");
    expect(newTask.status).toBe("To Do");
});

test("HTML element to page ", () => {
    let tableBody = document.querySelector("#example");
    const card = new TaskManager(tableBody);
    card.addTask("1", "Project", "Project Completion", "Lakshman", "28/08/2020", "To Do");
    expect(tableBody.innerHTML).toContain("<col>");
});
// delete task
test("Task deletion", () => {
    const newTask = new TaskManager();
    newTask.addTask(1, "Project", "Project Completion", "Lakshman", "28/08/2020", "To Do");
    newTask.storeTask();
    newTask.deleteTask(1);
    expect(Boolean(Object[1])).toBe(false); 
});

test("Task update", () => {
    const newTask = new TaskManager();
    const actual=newTask.addTask("1", "Project", "Project Completion", "Lakshman", "28/08/2020", "To Do");    
    newTask.storeTask();
    const expected=newTask.addTask("1", "Project", "Project updated", "Lakshman", "28/08/2020", "To Do");
    newTask.storeTask();
    newTask.updateTask("1");
    newTask.storeTask();
    expect(actual).toMatchObject(expected);
});

