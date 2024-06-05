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

//function to generate a unique task id
function generateTaskId(uniqueId) {
    // Generates a random number
    const randomNumber = Math.floor(Math.random() * 1000000);
    
    // Combines uniqueId and random number to create the task id
    const taskId = uniqueId + '-' + randomNumber;

    return taskId;
}

//function to create a task card
function createTaskCard(tasks) {

//create HTML elements for the task card
const taskCard = document.createElement('div');
taskCard.classList.add('task-card', 'draggable', 'droppable', 'border', 'border-grey','rounded'); 
taskCard.classList.add('draggable', 'true',);
taskCard.setAttribute('data-unique-id', tasks.uniqueId);
taskCard.style.marginBottom = '20px'; //adds margin to create space between the task cards
taskCard.style.width = '280px';
taskCard.style.padding = '10px';


//styling and content for header of task card
const taskTitle = document.createElement('h3');
taskTitle.classList.add('class', 'card-header');
taskTitle.textContent = tasks.title;

//styling and content for task description section of task card
const taskDescription = document.createElement('p');
taskDescription.classList.add('class', 'card-text');
taskDescription.style.marginTop = '10px';
taskDescription.textContent = tasks.description;

//styling and content for due date section of task card
const taskDueDate = document.createElement('p');
taskDueDate.classList.add('class', 'card-text');
taskDueDate.textContent = `Due Date: ${tasks.dueDate}`;

//delete button styling and content
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.classList.add('delete-btn');
deleteButton.classList.add('bg-danger','border-danger', 'text-white', 'rounded');


//event listener for the delete button
deleteButton.addEventListener('click', function() {
    handleDeleteTask(tasks.uniqueId);

});


//calculates the difference between the due date and current date using dayjs
const dueDate = dayjs(tasks.dueDate);
const currentDate = dayjs();
const differenceInDays = dueDate.diff(currentDate, 'day');

// Apply bootstrap classes for cards based on date
if (differenceInDays < 0) {
    taskCard.classList.add('bg-danger','text-white'); //applies the danger bootstrap class for tasks that are overdue
} else if (differenceInDays < 3) {
    taskCard.classList.add('bg-warning','text-white'); //applies the warning boostrap class for tasks that are due within 3 days
}

// Appends the created elements to the task card
taskCard.appendChild(taskTitle);
taskCard.appendChild(taskDescription);
taskCard.appendChild(taskDueDate);
taskCard.appendChild(deleteButton);

return taskCard;
}

//function to handle deleting a task
function handleDeleteTask(taskId){
    let taskList = getFromLocalStorage();

    //finds the index of the task with the given taskID
    const taskIndex = taskList.findIndex(task => task.uniqueId === taskId);

    if (taskIndex !== -1) {
        // removes the task from the taskList
    taskList.splice(taskIndex, 1);

    //saves taskList to local storage
    saveInLocalStorage(taskList);

    //re-renders task list
    renderTaskList();
    }
    
}

//function to render the task list and make cards draggable
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
        // Get dropped task card
        const droppedTask = ui.draggable;
        // Get dropped column's ID
        const droppedColumnId = $(this).attr('id');
        // Get task ID from dropped task card
        const taskId = droppedTask[0].dataset.uniqueId;
        // Update task status based on dropped column
        let status;
        if (droppedColumnId === 'to-do') {
            status = 'to-do';
        } else if (droppedColumnId === 'in-progress') {
            status = 'in-progress';
        } else if (droppedColumnId === 'done') {
            status = 'done';
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

// jQuery datepicker widget for due date
$(document).ready(function () {
    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
      });

    // Renders task list 
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

});

// function to handle adding a new task
function handleAddTask(event){
    //prevent default behavior
    event.preventDefault();
    //generate a unique task ID
    const taskId = generateTaskId('Task ID');

    //retrieves the task title, due date and description based on the form inputs
    const taskTitle = $('#task-title').val();
    const taskDueDate = $('#task-due-date').val();
    const taskDescription = $('#task-description').val();

    //retrieves the current task list from local storage
    let taskList = getFromLocalStorage();

    //creates a new task object with the inputs and pushes it to the task list
    taskList.push({
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        uniqueId: taskId,
        status: 'to-do'
    });

    //saves the task list to local storage
    saveInLocalStorage(taskList);
    $('#task-title, #task-due-date, #task-description').val('');

    //re-renders the task list to reflect changes
    renderTaskList();

}

