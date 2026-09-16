const tasks = JSON.parse(localStorage.getItem("tasks")) || [
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
const tagFilter = document.getElementById("tagFilter");
const srcbtn = document.getElementById("srcbtn");
const filterbtn = document.getElementById("filterbtn");
const submitBtn = taskForm.querySelector("button[type='submit']");
const formHeading = document.getElementById("formHeading");
const resetFilterBtn = document.getElementById("resetFilterBtn");
let editId = null;

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tagSet = new Set();
updateTagSet();
updateTagDropdown();

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
            <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
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
    const title = document.getElementById("title").value;
    const assignee = document.getElementById("assignee").value;
    const taskStatus = document.getElementById("status").value;
    const taskPriority = document.getElementById("priority").value;
    const tags = document.getElementById("tags").value.split(",").map(function (tag) {
        return tag.trim();
    });
    if (editId !== null) {
        const task = tasks.find(function (x) {
            return x.id === editId;
        });
        task.title = title;
        task.assignee = assignee;
        task.status = taskStatus;
        task.priority = taskPriority;
        task.tags = tags;
        editId = null;
        document.getElementById("taskId").readOnly = false;
        formHeading.innerText = "Add Task";
        submitBtn.innerText = "Add Task";
    }
    else {
        const existingId = tasks.find(function (x) {
            return x.id === id;
        });
        if (existingId) {
            alert("ID already existed");
            return;
        }
        const newTask = {
            id: id,
            title: title,
            assignee: assignee,
            status: taskStatus,
            priority: taskPriority,
            tags: tags
        };
        tasks.push(newTask);
    }
    tags.forEach(function (tag) {
        if (!tagSet.has(tag)) {
            tagSet.add(tag);
        }
    });
    
    updateTagDropdown();
    saveTasks();
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
                <button onclick="editTask(${x.id})">Edit</button>
                <button onclick="deleteTask(${x.id})">Delete</button>
            </td>
            `;
            taskTable.appendChild(row);

        });
    }
});

filterbtn.addEventListener("click", function () {
    const selectst = statusFilter.value;
    const selectPr = priorityFilter.value;
    const selectTag = tagFilter.value;
    if (selectst === "" && selectPr === "" && selectTag === "") {
        displayTasks();
        return;
    }
    const result = tasks.filter(function (task) {
        if (selectst !== "" && task.status !== selectst) {
            return false;
        }
        if (selectPr !== "" && task.priority !== selectPr) {
            return false;
        }
        if (selectTag !== "" && !task.tags.includes(selectTag)) {
            return false;
        }
        return true;
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
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
});

resetFilterBtn.addEventListener("click", function () {
    search.value = "";
    statusFilter.value = "";
    priorityFilter.value = "";
    tagFilter.value = "";
    
    displayTasks();
});

function deleteTask(id) {
    const index = tasks.findIndex(function (task) {
        return task.id === id;
    });
    if (index === -1) {
        return;
    }
    tasks.splice(index, 1);

     // Rebuild tag Set (DEENDS, after deleteing the required row, you 
     // want that tag to be deleetd from dropdown or not)
    tagSet.clear();
    updateTagSet();
    updateTagDropdown();

    saveTasks();
    displayTasks();
    updateDashboard();
}

function editTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });
    editId = id;
    document.getElementById("taskId").value = task.id;
    document.getElementById("title").value = task.title;
    document.getElementById("assignee").value = task.assignee;
    document.getElementById("status").value = task.status;
    document.getElementById("priority").value = task.priority;
    document.getElementById("tags").value = task.tags.join(", ");
    document.getElementById("taskId").readOnly = true;
    formHeading.innerText = "Edit Task";
    submitBtn.innerText = "Update Task";
    taskFormContainer.style.display = "block";
}


function updateTagSet() {
    tasks.forEach(function (task) {
        task.tags.forEach(function (tag) {
            tagSet.add(tag);
        });
    });
}

function updateTagDropdown() {
    tagFilter.innerHTML = `<option value="">Select Tag</option>`;
    tagSet.forEach(function (tag) {
        const option = document.createElement("option");
        option.value = tag;
        option.innerText = tag;
        tagFilter.appendChild(option);
    });
}
displayTasks();
updateDashboard();

