# Project Task Board

## Description
This application functions as a simple task board that allows a team to manage project tasks. As a project team member, I want to be able to organize multiple tasks by adding individual project tasks, managing their state of progress and track overall progress accordingly. 


## Installation
N/A

## Usage
Upon viewing the page, you will see three columns where you can place tasks depending on their progress state: to do, in progress, and done. To add a task, select the green "add task" button under the header. After clicking the button, you are presented with a modal where information for task title, due date and task description can be entered. For the due date, the difference in days between the due date and current date are calculated using dayjs. Dayjs handles date and time manipulation by taking two arguments, the current date and unit of measurement, and returns the difference in the specified unit, which in our case, is days. Based on what day is entered, the card color will be red if the due date has passed, yellow if it is due soon (within 3 days of the due date) and white if it is outside of the 3 day window. This is done using the CSS framework Bootstrap, as is the the majority of the styling you see on this application.

The link to the deployed application is here:

![alt text](https://github.com/savannahmarshall/Project-Task-Board/blob/main/assets/challenge-5%20screenshot.png)

## Credits
N/A

### License
N/A





