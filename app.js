//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    // Add task event 
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

}
//get task from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('string') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
//Create li element
const li = document.createElement('li');
//add class
li.className = 'collection-item';
//create textnode and append to li
li.appendChild(document.createTextNode(task));
//Create new link element
const link = document.createElement('a');
//add class
link.className = 'delete-item secondary-content';
// add icon 
link.innerHTML = '<i class="fa fa-remove></i>';
//append the link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);
    })
}
//Add Task
function addTask(e){
if(taskInput.value === ''){
    alert('Add task');   
}
//Create li element
const li = document.createElement('li');
//add class
li.className = 'collection-item';
//create textnode and append to li
li.appendChild(document.createTextNode(taskInput.value));
//Create new link element
const link = document.createElement('a');
//add class
link.className = 'delete-item secondary-content';
// add icon 
link.innerHTML = '<i class="fa fa-remove></i>';
//append the link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);

//Store in LS
storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value = '';

    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
tasks=JSON.parse(localStorage.getItem('tasks'));
        }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure?')){
        e.target.parentElement.parentElement.remove();

        //remove from ls
        removeTaskFromLocalStorage(
            e.target.parentElement.parentElement
        );
        }  
    }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
tasks=JSON.parse(localStorage.getItem('tasks'));
         }
        tasks.forEach(function(task){
             if(taskItem.textContent === task){
                    task.splice(index, 1);
             }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear task 
function clearTasks(){
    //taskList.innerHTML='';

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear from LS
    clearTasksFromLocalStorage();
}
//clear task from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks
function filterTasks(e){
const text = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach();
(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display='block';
    }else{
task.style.display='none';
    }
})
}