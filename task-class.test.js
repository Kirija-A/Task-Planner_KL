import Task from "./task-class.js";
test("Task Constructor", () => {
    const task = new Task("1", "Holiday", "shopping, packing and cleaning", "Kirija", "08/09/2020", "To Do");
    expect(task.id).toBe("1");
    expect(task.name).toBe("Holiday");
    expect(task.details).toBe("shopping, packing and cleaning");
    expect(task.assignee).toBe("Kirija");
    expect(task.dueDate).toBe("08/09/2020");
    expect(task.status).toBe("To Do");
});