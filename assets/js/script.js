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
taskCard.setAttribute('class','task-card');

const taskTitle = document.createElement('h3');
taskTitle.textContent = tasks.title;

const taskDescription = document.createElement('p');
taskDescription.textContent = tasks.description;

const taskDueDate = document.createElement('p');
taskDueDate.textContent = `Due Date: ${tasks.dueDate}`;

// Appending the elements to the task card

taskCard.appendChild(taskTitle);
taskCard.appendChild(taskDescription);
taskCard.appendChild(taskDueDate);

return taskCard;

// Append the task card elements to the columns in the task board

// const taskBoard = document.getElementById('todo-cards')
// taskBoard.appendChild(taskCard);


// Select the columns where you want to append the task cards



// // Append the task card to the to do column
// toDoColumn.appendChild(taskCard);
// inProgressColumn.appendChild(taskCard);
// doneColumn.appendChild(taskCard);
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
function handleDrop(event, ui) {
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#add-task').on('click', function(event) {
    // Call the handleAddTask function when the button is clicked
    handleAddTask(event);
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