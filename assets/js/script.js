// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = JSON.parse(localStorage.getItem('nextId')) || [];

// const taskTitle = $('#task-title');
// const taskDueDate = $('#task-due-date');
// const taskDescription = $('#task-description');

// let tasks = {
//     title: taskTitle,
//     dueDate: taskDueDate,
//     description: taskDescription,
//     uniqueId: taskId,
//     status: 'to-do',
// };
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks'))  || [];
}
function saveInLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}
// function readIdFromLocalStorage() {
//     let nextId = JSON.parse(localStorage.getItem('nextId')) ||[];
//     return nextId;
// }
function saveIdToLocalStorage() {
    localStorage.setItem('nextId', JSON.stringify(nextId));
}
// // Todo: create a function to generate a unique task id
function generateTaskId(uniqueId) {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 1000000);
    
    // Combine uniqueId and random number to create the task id
    const taskId = uniqueId + '-' + randomNumber;
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(tasks) {
    // const taskList = getFromLocalStorage();

//create HTML elements for the task card
const taskCard = document.createElement('div');
taskCard.setAttribute('class','task-card draggable');
taskCard.setAttribute('draggable', 'true');

const taskTitle = document.createElement('h3');
taskTitle.textContent = tasks.title;

const taskDescription = document.createElement('p');
taskDescription.textContent = tasks.description;

const taskDueDate = document.createElement('p');
taskDueDate.textContent = `Due Date: ${tasks.dueDate}`;

//calculate the difference between the due date and current date
const dueDate = new Date(tasks.dueDate);
const currentDate = new Date();
const differenceInDays = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

// Apply corresponding CSS class based on the difference
if (differenceInDays < 0) {
    taskCard.classList.add('overdue');
} else if (differenceInDays < 3) {
    taskCard.classList.add('due-soon');
}

// Appending the elements to the task card

taskCard.appendChild(taskTitle);
taskCard.appendChild(taskDescription);
taskCard.appendChild(taskDueDate);

return taskCard;
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
}

//makes cards draggable
$('.draggable').draggable( {
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('ui.draggable');
        return original.clone().css({
            width: original.outerWidth(),
        })
    }
})


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskId = generateTaskId('Task ID');
    console.log(taskId);
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
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
}
// Todo: create a function to handle dropping a task into a new status lane
// Make columns droppable
$('.column').droppable({
    accept: '.task-card.draggable', // Specify which elements can be dropped
    tolerance: 'pointer', // Mouse pointer must overlap droppable area
    drop: function(event, ui) {
        // Get dropped task card
        const droppedTask = ui.draggable;

        // Get dropped column's ID
        const droppedColumnId = $(this).attr('id');

        // Get task ID from dropped task card
        const taskId = droppedTask.attr('id');

        // Update task status based on dropped column
        let status;
        if (droppedColumnId === 'todo-cards') {
            status = 'to-do';
        } else if (droppedColumnId === 'in-progress-cards') {
            status = 'in-progress';
        } else if (droppedColumnId === 'done-cards') {
            status = 'done';
        }

        // Update task status in taskList (assuming taskList is updated globally)
        const updatedTask = taskList.find(task => task.id === taskId);
        updatedTask.status = status;

        // Save updated taskList to local storage
        saveInLocalStorage(taskList);

        // Re-render task list to reflect changes
        renderTaskList();
    }
});
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
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
});


// Datepicker widget for due date
$(function () {
    $('#task-due-date').datepicker({
      changeMonth: true,
      changeYear: true,
    });

    renderTaskList();
  });
});