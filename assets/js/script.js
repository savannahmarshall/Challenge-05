// Retrieve tasks and nextId from localStorage

// const tasks = document.getElementById("#formModal");

// const task = document.getElementById("#task-title");
// const dueDate = document.getElementById("#task-due-date");
// const taskDescription = document.getElementById("task-description");

// const taskList = [];

let task = {
    title: taskName,
    dueDate: taskDueDate,
    description: taskDescription,
    uniqueId: taskId,
    status: 'to-do',
}





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







// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = "id" + Math.random().toString(16).slice(2)
    console.log(id)
}     

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


    addTaskButton.addEventListener('click', function(event) {
        event.preventDefault();
    
    });



// Datepicker widget for due date
$(function () {
    $('#task-due-date').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  

});
