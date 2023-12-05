"use strict";

// When document is ready...
$(document).ready(() => {
    
    // defining a variable...
    let tasks;

    // if there is data in localstorage it will be assigned to variable otherwise it be assigned to an empty array...
    (JSON.parse(localStorage.getItem('tasks'))) ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
     
    // function for saving tasks to localstorage...
    const saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // function for displaying the tasks...
    const displayTask = (newTaskList) => {
        const taskList = $('#taskList');
        taskList.html('');
    
        // creating a list item for displaying items of a task...
        newTaskList.forEach((task, index) => {
            const li = $('<li>').html(`
                <strong>Description:</strong> ${task.description}<br>
                <strong>Assigned to:</strong> ${task.assignedTo}<br>
                <strong>Estimated Time:</strong> ${task.estimatedTime}<br>
                <strong>Priority:</strong> ${task.priority}<br>
                <strong>Status:</strong> ${task.status}
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            `);

            // adding class according to priorities becasue it will have background color according to priority...
            switch (task.priority) {
                case 'High':
                    li.addClass('high-priority');
                    break;
                case 'Medium':
                    li.addClass('medium-priority');
                    break;
                case 'Low':
                    li.addClass('low-priority');
                    break;
                default:
                    break;
            }

            taskList.append(li);
        });
    }

    // function for editing a task...
    const editTask = function() {
        const index = $(this).data('index');

        $('#taskDescriptionInput').val(tasks[index].description);
        $('#assignedToInput').val(tasks[index].assignedTo);
        $('#estimatedTime').val(tasks[index].estimatedTime);
        $('#priorityInput').val(tasks[index].priority);
        $('#statusInput').val(tasks[index].status);

        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        displayTask(tasks)
    }

    // function for deleting a task...
    const deleteTask = function () {

        // taking permission from user if they want to delete that task....
        const permission = confirm("Are you sure you want to delete this task?");

        // if user says ok then task will be deleted otherwise it will not be deleted...
        if (permission) {
            const index = $(this).data('index');
            tasks.splice(index, 1);
            saveTasksToLocalStorage();
            displayTask(tasks)
        }

    }

    // function for filtering tasks according to search input using fiter method....
    const filterTasks = () => {
        const searchText = $('#searchInput').val().toLowerCase();
        const filteredTasks = tasks.filter(task =>
            task.description.toLowerCase().includes(searchText) ||
            task.assignedTo.toLowerCase().includes(searchText) ||
            task.estimatedTime.toLowerCase().includes(searchText) ||
            task.priority.toLowerCase().includes(searchText) ||
            task.status.toLowerCase().includes(searchText)
        );
        displayTask(filteredTasks)
    }

    // function for adding the task when add task button is clicked...
    $("#addTaskBtn").click(() => {
        const description = $('#taskDescriptionInput').val();
        const assignedTo = $('#assignedToInput').val();
        const estimatedTime = $('#estimatedTime').val();
        const priority = $('#priorityInput').val();
        const status = $('#statusInput').val();

        const newTask = {
            description,
            assignedTo,
            estimatedTime,
            priority,
            status
        };

        tasks.push(newTask);
        saveTasksToLocalStorage();
        displayTask(tasks)
        clearForm();
    });
    
    // when button is clicked with .editBtn class it will call editTask class...
    $('#taskList').on('click', '.editBtn', editTask);

    // when button is clicked with .deleteBtn class it will call deleteTask class...
    $('#taskList').on('click', '.deleteBtn', deleteTask);

    // when searchInput is changed it will call filterTasks method...
    $("#searchInput").on('input', filterTasks);

    displayTask(tasks)
    
    // function for clearing the form after task is added...
    const clearForm = () => {
        $('#taskDescriptionInput').val('');
        $('#assignedToInput').val('');
        $('#estimatedTime').val('');
        $('#priorityInput').val("");
        $('#statusInput').val("");
    }
});