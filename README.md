# Project Task Board

## Description
This application functions as a simple task board that can be used to manage project tasks. For the user story, as a project team member, I want to be able to organize multiple tasks by adding individual project tasks, managing their state of progress and track overall progress accordingly. 

While completing this project, I faced a few challenges, particularly with the function that allows the card to be dropped into different columns. I learned how to utilize the CSS framework Bootstrap to style the task cards using JavaScript instead of creating classes in the style.css. I also learned how to create a functional modal using HTML and JavaScript, how to add a delete button, and gained more practice with using local storage to save data.


## Installation
No installation steps are required for this project as it is a web-based application that runs in the browser.

## Usage
Upon viewing the page, you will see three columns where you can place tasks depending on their progress state: to do, in progress, and done. To add a task, select the green "add task" button under the header. After clicking the button, you are presented with a modal where information for task title, due date and task description can be entered. For the due date, the difference in days between the due date and current date are calculated using Day.js. Day.js handles date and time manipulation by taking two arguments, the current date and unit of measurement, and returns the difference in the specified unit, which in our case, is days. Based on what day is entered, the card color will appear red if the due date has passed, yellow if it is due soon (within 3 days of the due date) and white if it is outside of the 3 day window. This is done using the CSS framework Bootstrap, as is the the majority of the styling you see on this application. After you have created a task, it will automatically show up in the "to do" column. The task can then be dragged and dropped into either of the three columns. You will also see that there is a delete button at the bottom of each task which, when clicked, removes the task from the page and from local storage. Finally, all tasks will persists upon page refresh.

The link to the deployed application is here: https://savannahmarshall.github.io/Project-Task-Board/.

![alt text](https://github.com/savannahmarshall/Project-Task-Board/blob/main/assets/challenge-5%20screenshot.png)

## Credits
Day.js
Bootstrap

### License
N/A





