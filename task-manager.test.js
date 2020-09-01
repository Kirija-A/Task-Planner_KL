import Taskmanager from "./task-manager.js";
import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() =>{ //sets up the DOM
    localStorage.clear();
    document.documentElement.innerHTML = html.toString();
});
// Testing Add task
test("Add Task", () => {
    const nTask = new Taskmanager();
    nTask.addTask("1", "Meet-up", "contact individuals and confirm, organise snacks", "Kirija", "2/09/2020", "In Progress");
    nTask.storeTask();
    expect(nTask.id).toBe("1");
    expect(nTask.name).toBe("Meet-up");
    expect(nTask.details).toBe("contact individuals and confirm, organise snacks");
    expect(nTask.assignee).toBe("Kirija");
    expect(nTask.dueDate).toBe("2/09/2020");
    expect(nTask.status).toBe("In Progress");
});

test("HTML element to page ", () => {
    let tableBody = document.querySelector("#example");
    const card = new Taskmanager(tableBody);
    card.addTask("1", "Meet-up", "contact individuals and confirm, organise snacks", "Kirija", "2/09/2020", "In Progress");
    expect(tableBody.innerHTML).toContain("<col>");
});

// Testing Delete Task
test("Delete Task", () => {
    const nTask = new Taskmanager();
    nTask.addTask("1", "Meet-up", "contact individuals and confirm, organise snacks", "Kirija", "2/09/2020", "In Progress");
    nTask.storeTask();
    nTask.storeTask("1");
    expect(Boolean(Object[1])).toBe(false);
});

// Testing Update Task
test("Update Task", () => {
    const nTask = new Taskmanager();
    nTask.addTask("1", "Meet-up", "contact individuals and confirm, organise snacks", "Kirija", "2/09/2020", "In Progress");
    nTask.storeTask();
    const updated=nTask.addTask("1", "Meet-up", "Postponed - contact individuals and inform", "Kirija", "01/10/2020", "To Do")
    nTask.storeTask();
    nTask.updateTask("1");
    nTask.storeTask();
    expect(nTask).toMatchObject(updated);
});
