/**
 * `body` For selecting HTML Document body
 */
const body = document.body;
/**
 * `taskForm` For selecting the  Form
 */
const taskForm = document.getElementById('taskForm');
/**
 * `tasklist` For selecting the ul For appending the task
 */
const taskList = document.getElementById('taskList');
/**
 * `taskDiv` The main Div for showing the Taskform 
 */
const taskDiv = document.getElementById('taskDiv');

const button = document.getElementById('button');
/**
 * `priorityFilter` For the dropdown which displays the task with the priority
 */
const priorityFilter = document.getElementById('priorityfilter');
/**
 * `taskSearch` For searching the task 
 */
const taskSearch = document.getElementById('taskSearch');

const togglebutton = document.getElementById('togglebutton');

const nav = document.getElementById('nav');

const menu = document.getElementById('menu');

var visible = true;
menu.addEventListener('click', function () {
    if (visible === true) {
        nav.style.display = 'block';
        visible = false;
    } else {
        nav.style.display = 'none';
        visible = true;
    }
});

/**
 * `taskstatus` Selecting the user-selected task status

/**
 * Function for searching the task
 */
taskSearch.addEventListener('input', function () {
    const query = taskSearch.value.toLowerCase();
    const tasks = Array.from(taskList.children);

    tasks.forEach(task => {
        const title = task.querySelector('h1').textContent.toLowerCase();
        const description = task.querySelector('h3').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
});

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Add event listener to the form
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.getElementById('priority').value;
    const taskid= Math.random();
    console.log(taskid);

    const task = { title, description, priority ,taskid , checked: false};

    saveTaskToLocalStorage(task);
    addTaskToUI(task);

    taskForm.reset();
    taskDiv.style.display = 'none';
});


// Save a task to local storage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage and display them
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToUI);
}

/**
 * 
 * @param {object} task  It is an object which contains the task title task description 
 * task id and input cheakin value 
 */
function addTaskToUI(task) {
    const listItem = document.createElement('div');
    listItem.dataset.priority = task.priority;

    const taskTitle = document.createElement('h1');
    taskTitle.textContent = task.title;

    // Set the title color based on priority
    switch (task.priority.toLowerCase()) {
        case 'high':
            taskTitle.style.color = 'red';
            break;
        case 'medium':
            taskTitle.style.color = 'yellow';
            break;
        case 'low':
            taskTitle.style.color = 'green';
            break;
        default:
            taskTitle.style.color = 'black';
    }
    //creating cheakbox for the task-title

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.checked;

    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = 'Task Current Status';
    checkboxLabel.style.color = 'grey'

    if (checkbox.checked) {
        taskTitle.style.textDecoration = 'line-through';
        taskTitle.style.color = 'gray';
    }

    checkbox.style.marginRight = '10px';

    checkbox.addEventListener('change', function () {
        task.checked = checkbox.checked; // Update the task's checked state
    updateTaskInLocalStorage(task); // Save the updated state to localStorage
        if (checkbox.checked) {
            taskTitle.style.textDecoration = 'line-through';
            taskTitle.style.color = 'gray'; // Temporary color when checked
        } else {
            taskTitle.style.textDecoration = 'none';
            // Reset to priority color
            switch (task.priority.toLowerCase()) {
                case 'high':
                    taskTitle.style.color = 'red';
                    break;
                case 'medium':
                    taskTitle.style.color = 'yellow';
                    break;
                case 'low':
                    taskTitle.style.color = 'green';
                    break;
                default:
                    taskTitle.style.color = 'black';
            }
        }
    });
    /**
     * adding cheakbox , cheakboxLabel and tasktitle to the ListItem
     */
    listItem.appendChild(checkbox);
    listItem.appendChild(checkboxLabel);
   
    listItem.appendChild(taskTitle);

    const desc = document.createElement('div');
    desc.style.display = 'none';

    const taskDescription = document.createElement('h3');
    taskDescription.innerHTML = `<h3>Description:</h3>${task.description}`;

    const taskPriority = document.createElement('h3');
    taskPriority.innerHTML = `<h3>Priority:</h3> ${task.priority}`;
     
    desc.appendChild(taskDescription);
    desc.appendChild(taskPriority);

    const showMore = document.createElement('button');
    showMore.textContent = 'Show More';
    showMore.style.marginRight = '10px';
    //for showing the description and priority
    showMore.addEventListener('click', function () {
        if (desc.style.display === 'none') {
            desc.style.display = 'block';
            showMore.textContent = 'Show Less';
        } else {
            desc.style.display = 'none';
            showMore.textContent = 'Show More';
        }
    });
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginRight = '10px';
    //function for editing a task
    editButton.addEventListener('click', function () {
        const newTitle = prompt('Edit Task Title:', task.title);
        const newDescription = prompt('Edit Task Description:', task.description);
        const newPriority = prompt('Edit Task Priority (High, Medium, Low):', task.priority);
/**
 * if all the the values of new edited task are there then only the  code 
 * within the if else block will run
 */
        if (newTitle && newDescription && newPriority) {
            task.title = newTitle;
            task.description = newDescription; 
            task.priority = newPriority;

            taskTitle.textContent = task.title;
            taskDescription.innerHTML = `<strong>Description:</strong> ${task.description}`;
            taskPriority.innerHTML = `<strong>Priority:</strong> ${task.priority}`;

            /**
             * Update title color based on new priority
             */ 
            switch (task.priority.toLowerCase()) {
                case 'high':
                    taskTitle.style.color = 'red';
                    break;
                case 'medium':
                    taskTitle.style.color = 'yellow';
                    break;
                case 'low':
                    taskTitle.style.color = 'green';
                    break;
                default:
                    taskTitle.style.color = 'black';
            }

            updateTaskInLocalStorage(task);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        deleteTaskFromLocalStorage(task);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '5px';
    buttonContainer.appendChild(showMore);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(desc);
    listItem.appendChild(buttonContainer);

    taskList.appendChild(listItem);
}
// Update task in local storage
function updateTaskInLocalStorage(updatedTask) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.title === updatedTask.title);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove a task from local storage
function deleteTaskFromLocalStorage(taskToDelete) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   // const updatedTasks = tasks.filter(task => task.index !== taskToDelete.index);
   const updatedTasks = tasks.filter(task => task.taskid== taskToDelete.taskid);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
// Show the task form when the button is clicked
button.addEventListener('click', () => {
    taskDiv.style.display = 'block';
});
// Event listener for priority filter
//priorityFilter.addEventListener('change', function () {
    //const selectedPriority = priorityFilter.value;
     //comarr = Array.from(taskList.children);
     //comarr.forEach(task => {
       // if (selectedPriority === 'All' || task.dataset.priority === selectedPriority) {
       //     task.style.display = 'block';
       // } else {
      //      task.style.display = 'none';
    //    }
  //  });
//});

let flag = true;
togglebutton.addEventListener('click', function () {
    if (flag === true) {
        document.body.style.backgroundColor = 'black';
        flag = false;
    } else {
        document.body.style.backgroundColor = 'white';
        flag = true;
    }
});



/**
 *applying eventlistner to the priorityfiltor and prioritystatus with a high order function
 callback with will be used for filtoring over each other selected task by cheaking the conditions
 */
priorityFilter.addEventListener('change', applyFilters);
taskstatus.addEventListener('change', applyFilters);
/*
 *Function to apply filters based on priority and status
*/
function applyFilters() {
    const selectedPriority = priorityFilter.value; 
    const selectedStatus = taskstatus.value; 

    const tasks = Array.from(taskList.children); 

    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]'); 
        const taskPriority = task.dataset.priority; 

        // Determine if the task matches the selected status
        const matchesStatus =
            ( selectedStatus === 'All' ) ||
            (selectedStatus === 'Complete' && checkbox.checked) ||
            (selectedStatus === 'Incomplete' && !checkbox.checked);

        // Determine if the task matches the selected priority
        const matchesPriority =
            selectedPriority === 'All' || taskPriority === selectedPriority;

          // Display the task only if it matches both filters  
        if (matchesStatus && matchesPriority) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}


