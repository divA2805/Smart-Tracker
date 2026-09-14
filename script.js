const tasks = [
    {
        id: 101,
        title: "Create Login Page",
        assignee: "Rahul",
        status: "In Progress",
        priority: "High",
        tags: ["Frontend", "React"]
    },
    {
        id: 102,
        title: "Create Payment API",
        assignee: "Aman",
        status: "Todo",
        priority: "Medium",
        tags: ["Backend", "API"]
    },
    {
        id: 103,
        title: "Fix Dashboard Bug",
        assignee: "Priya",
        status: "Completed",
        priority: "Low",
        tags: ["Bug", "Frontend"]
    }
];


const taskTable = document.getElementById("taskTable");
const totalTasks = document.getElementById("totalTasks");
const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const completedTasks = document.getElementById("completedTasks");
const taskFormBtn = document.getElementById("taskFormBtn");
const taskFormContainer = document.getElementById("taskFormContainer");
const taskForm = document.getElementById("taskForm");

function displayTasks() {

    taskTable.innerHTML = "";

    tasks.map(function(task) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.assignee}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.tags.join(", ")}</td>
            <td>
            <button>Edit</button>
            <button>Delete</button>
            </td>`;

        taskTable.appendChild(row);
    });
}

function updateDashboard() {

    totalTasks.innerText = tasks.length;

    todoTasks.innerText =
        tasks.filter(function(task) {
            return task.status === "Todo";
        }).length;

    progressTasks.innerText =
        tasks.filter(function(task) {
            return task.status === "In Progress";
        }).length;

    completedTasks.innerText =
        tasks.filter(function(task) {
            return task.status === "Completed";
        }).length;
}

taskFormContainer.style.display = "block";
taskFormBtn.addEventListener("click", function() {

    if (taskFormContainer.style.display === "none") {
        taskFormContainer.style.display = "block";
    }
    else {
        taskFormContainer.style.display = "none";
    }

});



taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const id=Number(document.getElementById("taskId").value);
    const existingId=tasks.find((x)=>{return x.id===id;})
    if (existingId) {
        alert("ID already existed");
        return;
    }
    const newTask = {
        id: Number(document.getElementById("taskId").value),
        title: document.getElementById("title").value,
        assignee: document.getElementById("assignee").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        tags: document.getElementById("tags").value.split(",").map(function(tag) {
            return tag.trim();
        })
    };
    tasks.push(newTask);
    //calling functions to update the data.
    displayTasks();
    updateDashboard();
    taskForm.reset();
});

displayTasks();
updateDashboard();

