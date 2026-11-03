const tasksWrapper = document.querySelector('.tasks-wrapper');
const button = document.querySelector('.button');
const input = document.querySelector('.task-input');

let ID = 0;
let editingTaskId = null;

let tasks = [
    // {
    //     "id": 1,
    //     "taskName": "homework",
    //     "completed": true
    // },

    // {
    //     "id": 2,
    //     "taskName": "gym",
    //     "completed": false
    // },

    // {
    //     "id": 3,
    //     "taskName": "barber",
    //     "completed": true
    // },

    // {
    //     "id": 4,
    //     "taskName": "bee",
    //     "completed": true
    // }
];

function render() {
    tasksWrapper.innerHTML = '';
    for (task of tasks) {
        tasksWrapper.innerHTML += `
            <div class="task-box" id=${task.id}>
                <p>${task.taskName}</p>
                <div class"buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                <div>
            </div>
        `;
    }
}

function addTask(e) {
    if (editingTaskId !== null) {
        tasks.find((item) => {
            if (item.id === editingTaskId) {
                item.taskName = input.value;

                render();

                input.value = '';
                editingTaskId = null;

                return true;
            }
        });

        return;
    }


    if (!input.value) {
        alert("Please write a task");

        return;
    }

    tasks = [
        ...tasks,
        {
            "id": ++ID,
            "taskName": input.value,
            "completed": false
        }
    ];

    input.value = '';
    render();
}

function init() {
    render();
}

button.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
    console.log(e.key)
    if(e.key === "Enter") {
        addTask();
    }
});
document.addEventListener('click', handleDelete);
document.addEventListener('click', handleEdit);


function handleDelete(event) {
    let element = event.target;
    if (element.classList.contains("delete-btn")) {
        tasks.find((item, idx) => {
            // debugger;
            if (item.id === +element.parentElement.parentElement.id) {
                tasks.splice(idx, 1);
                editingTaskId = null;
                input.value = '';

                return true;
            }
        });
    }
    render()
}

function handleEdit() {
    let element = event.target;
    if (element.classList.contains("edit-btn")) {
        console.log(element.parentElement.parentElement);
        input.value = element.parentElement.parentElement.taskName;

        tasks.find((item, idx) => {
            if (item.id === +element.parentElement.parentElement.id) {
                editingTaskId = item.id;
                input.value = item.taskName;
                return true;
            }
        })
    }
}

init();