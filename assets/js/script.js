// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = JSON.parse(localStorage.getItem('nextId')) || [];

//functions for local storage
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks'))  || [];
}

function saveInLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function saveIdToLocalStorage() {
    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// Todo: create a function to generate a unique task id
function generateTaskId(uniqueId) {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 1000000);
    
    // Combine uniqueId and random number to create the task id
    const taskId = uniqueId + '-' + randomNumber;
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(tasks) {

//create HTML elements for the task card
const taskCard = document.createElement('div');
taskCard.classList.add('task-card', 'draggable', 'droppable');
taskCard.setAttribute('draggable', 'true');
taskCard.setAttribute('data-unique-id', tasks.uniqueId);

const taskTitle = document.createElement('h3');
taskTitle.textContent = tasks.title;

const taskDescription = document.createElement('p');
taskDescription.textContent = tasks.description;

const taskDueDate = document.createElement('p');
taskDueDate.textContent = `Due Date: ${tasks.dueDate}`;

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.classList.add('delete-btn');

//add event listener for the delete button
deleteButton.addEventListener('click', function() {
    handleDeleteTask(task.uniqueId);

});


//calculate the difference between the due date and current date
const dueDate = new Date(tasks.dueDate);
const currentDate = new Date();
const differenceInDays = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

// Apply matching CSS class for red or yellow based on the difference 
if (differenceInDays < 0) {
    taskCard.classList.add('overdue');
} else if (differenceInDays < 3) {
    taskCard.classList.add('due-soon');
}

// Appending the elements to the task card

taskCard.appendChild(taskTitle);
taskCard.appendChild(taskDescription);
taskCard.appendChild(taskDueDate);
taskCard.appendChild(deleteButton);
// console.log(taskCard);

return taskCard;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId){
    let taskList = getFromLocalStorage();

    //find the index of the task with the given taskID
    const taskIndex = taskList.findIndex(task => task.uniqueId === taskId);

    if (taskIndex !== -1) {
        // remove the task from the taskList
    taskList.splice(taskIndex, 1);

    //save taskList to local storage
    saveInLocalStorage(taskList);

    //rebder the task list again
    renderTaskList();
    }
    
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // gets reference to the task columns by ID
    const toDoColumn = document.getElementById('todo-cards');
    const inProgressColumn = document.getElementById('in-progress-cards');
    const doneColumn = document.getElementById('done-cards');
   
    // clears existing content in the columns
    toDoColumn.innerHTML = '';
    inProgressColumn.innerHTML = '';
    doneColumn.innerHTML = '';

    // retrieves the task list from local storage
    const taskList = getFromLocalStorage();

    // iterates over each of the tasks and appends the task cards to the corresponding columns
    for (let task of taskList) {
        // Call createTaskCard function to create a task card for the current task
        const taskCard = createTaskCard(task);

        if (task.status === 'to-do') {
            toDoColumn.appendChild(taskCard);
        } else if (task.status === 'in-progress') {
            inProgressColumn.appendChild(taskCard);
        } else if (task.status === 'done') {
            doneColumn.appendChild(taskCard);
        }
    }

   // Call draggable() after task cards are appended to the DOM
   $('.task-card').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
        const original = $(e.target).hasClass('task-card')
            ? $(e.target)
            : $(e.target).closest('.task-card');
        return original.clone().css({
            width: original.outerWidth(),
        });
    }
});

//add droppable feature to columns
$('#to-do, #in-progress, #done').droppable({
    //specify which elements can be dropped
    accept: '.task-card', 
    tolerance: 'pointer',
    drop: function(event, ui) {
        // console.log(event, "hit");
        // Get dropped task card
        const droppedTask = ui.draggable;
        // console.log(droppedTask);
        // Get dropped column's ID
        const droppedColumnId = $(this).attr('id');
        console.log("droppedColumnId", droppedColumnId)
        // Get task ID from dropped task card
        const taskId = droppedTask[0].dataset.uniqueId;
        console.log(taskId);
        // Update task status based on dropped column
        let status;
        if (droppedColumnId === 'to-do') {
            status = 'to-do';
            console.log("hit to-do")
        } else if (droppedColumnId === 'in-progress') {
            status = 'in-progress';
            console.log("hit in-progress")
        } else if (droppedColumnId === 'done') {
            status = 'done';
            console.log("hit done")
        }


        // Update task status in taskList 
        const updatedTaskIndex = taskList.findIndex(task => task.uniqueId === taskId);
        if (updatedTaskIndex !== -1) {
            taskList[updatedTaskIndex].status = status;
            // Save updated taskList to local storage
            saveInLocalStorage(taskList);

            // Re-render task list to reflect changes
            renderTaskList();
        }
    }
});

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Datepicker widget for due date
    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
      });

// Render task list and initialize draggable after the DOM is fully loaded
      renderTaskList();

    $('#add-task').on('click', function(event) {
    // Call the handleAddTask function when the button is clicked
    handleAddTask(event);
    
});

//code for initializing modal
const myModal = new bootstrap.Modal(document.getElementById('formModal'));

// Handle Add Task button click event
$('#add-task').click(function() {
  
  // Close modal
  myModal.hide();
    })

// $(document).ready(function() {
//     renderTaskList();
});

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskId = generateTaskId('Task ID');
    const taskTitle = $('#task-title').val();
    const taskDueDate = $('#task-due-date').val();
    const taskDescription = $('#task-description').val();

    let taskList = getFromLocalStorage();

    taskList.push({
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        uniqueId: taskId,
        status: 'to-do'
    });

    saveInLocalStorage(taskList);

    $('#task-title').val('');
    $('#task-due-date').val('');
    $('#task-description').val('');

    renderTaskList();

}

    


// Todo: create a function to handle dropping a task into a new status lane
// Make columns droppable
