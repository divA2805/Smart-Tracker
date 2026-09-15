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
const search = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const srcbtn = document.getElementById("srcbtn");
const filterbtn = document.getElementById("filterbtn");

function displayTasks() {

    taskTable.innerHTML = "";

    tasks.map((task) => {
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
        tasks.filter(function (task) {
            return task.status === "Todo";
        }).length;

    progressTasks.innerText =
        tasks.filter(function (task) {
            return task.status === "In Progress";
        }).length;

    completedTasks.innerText =
        tasks.filter(function (task) {
            return task.status === "Completed";
        }).length;
}

taskFormContainer.style.display = "none";
taskFormBtn.addEventListener("click", function () {

    if (taskFormContainer.style.display === "none") {
        taskFormContainer.style.display = "block";
    }
    else {
        taskFormContainer.style.display = "none";
    }

});



taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = Number(document.getElementById("taskId").value);
    const existingId = tasks.find((x) => { return x.id === id; })
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
        tags: document.getElementById("tags").value.split(",").map(function (tag) {
            return tag.trim();
        })
    };
    tasks.push(newTask);
    //calling functions to update the data.
    displayTasks();
    updateDashboard();
    taskForm.reset();
});

srcbtn.addEventListener("click", function () {
    const key = search.value.trim().toLowerCase();
    if (key === "") {
        alert("Enter a Value");
        displayTasks();
        return;

    }
    const result = tasks.filter((x) => {
        //if (x.id===Number(key)||x.assignee.toLowerCase()===key||x.title.toLowerCase()===key)
        return (x.assignee.toLowerCase() === key || x.title.toLowerCase() === key);
    });
    if (result.length === 0) {
        alert("Value is not present");
        displayTasks();
    } else {
        taskTable.innerHTML = "";
        result.map((x) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${x.id}</td>
            <td>${x.title}</td>
            <td>${x.assignee}</td>
            <td>${x.status}</td>
            <td>${x.priority}</td>
            <td>${x.tags.join(", ")}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
            `;
            taskTable.appendChild(row);

        });
    }
});
filterbtn.addEventListener("click", function () {
    const selectst = statusFilter.value;
    const selectPr = priorityFilter.value;
    if (selectst === "" && selectPr === "") {
        displayTasks();
        return;
    }
    const result = tasks.filter(function (task) {
        if (selectst !== "" && selectPr !== "") {

            return (
                task.status === selectst &&
                task.priority === selectPr
            );
        }
        if (selectst !== "") {

            return task.status === selectst;
        }
        if (selectPr !== "") {

            return task.priority === selectPr;
        }

    });
    if (result.length === 0) {
        alert("No task found");
        displayTasks();
        return;
    }
    taskTable.innerHTML = "";
    result.map(function (task) {
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
            </td>
        `;
        taskTable.appendChild(row);

    });
});

displayTasks();
updateDashboard();

