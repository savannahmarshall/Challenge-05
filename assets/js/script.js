// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

const taskTitle = $('#task-title');
const taskDueDate = $('#task-due-date');
const taskDescription = $('#task-description');

let tasks = {
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    // uniqueId: taskId,
    status: 'to-do',
};
function getFromLocalStorage() {
    let taskList = JSON.parse(localStorage.getItem('tasks'));
    if (!taskList) {
        taskList = [];
    }
    return taskList;
}
function saveInLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}
function readIdFromLocalStorage() {
    let nextId = JSON.parse(localStorage.getItem('nextId'));
    if(!nextId) {
        nextId = [];
    }
    return nextId;
}
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
const taskId = generateTaskId('Task ID');
console.log(taskId);


// Todo: create a function to create a task card
function createTaskCard(title, description, dueDate) {


//create HTML elements for the task card
const taskCard = document.createElement('div');
taskCard.classList.add('task-card');

const taskTitle = document.createElement('h3');
taskTitle.textConent = title;

const taskDescription = document.createElement('p');
taskDescription.textConent = description;

const taskDueDate = document.createElement('p');
taskDueDate.textConent = `Due Date: ${dueDate}`;

// Appending the HTML elements to the task card

taskCard.appendChild (taskTitle);
taskCard.appendChild (taskDescription);
taskCard.appendChild (taskDueDate);

// Append the task card elements to the columns in the task board

const taskBoard = document.getElementById('todo-cards')
taskBoard.appendChild(taskCard);


// Select the columns where you want to append the task cards
const toDoColumn = document.getElementById('todo-cards');
const inProgressColumn = document.getElementById('in-progress-cards');
const doneColumn = document.getElementById('done-cards');


// Append the task card to the to do column
toDoColumn.appendChild(taskCard);
inProgressColumn.appendChild(taskCard);
doneColumn.appendChild(taskCard);
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
// created empty columns so that no duplicates will happen
    toDoColumn.empty();
    inProgressColumn.empty();
    doneColumn.empty();
    const taskList = readfromStorage();

    for (let task of taskList) {
        if (task.status === 'to-do') {
            toDoColumn.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressColumn.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneColumn.append(createTaskCard(task));
        }
        }
    }

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = $('#task-title').val();
    const taskDueDate = $('#task-due-date').val();
    const taskDescription = $('#task-description').val();
    let tasks = {
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        // uniqueId: taskId,
        status: 'to-do'
    };
    let taskList = [];
    taskList.push(tasks);

    saveInLocalStorage(taskList);
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
  });
});