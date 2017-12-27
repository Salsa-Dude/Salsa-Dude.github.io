const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter");
const taskInput =  document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }

  tasks.forEach(function(task) {
     // Create a li element
    const li = document.createElement('li');
    // Add a class
    li.className = "collection-item";
    // Create a text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create a link element
    const link = document.createElement('a');
    // Add a class
    link.className = "delete-item secondary-content";
    // Add a icon html
    link.innerHTML = '<i class="fa fa-remove"></li>'
    // Append the link to li
    li.appendChild(link);

    // Append the li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault()
  if (taskInput.value === "" ) {
    alert('Add a Task');
  } 
  // Create a li element
  const li = document.createElement('li');
  // Add a class
  li.className = "collection-item";
  // Create a text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a link element
  const link = document.createElement('a');
  // Add a class
  link.className = "delete-item secondary-content";
  // Add a icon html
  link.innerHTML = '<i class="fa fa-remove"></li>'
  // Append the link to li
  li.appendChild(link);

  // Append the li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);


  // Clear input
  taskInput.value = '';

}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item')) {
   if(confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();
    // Remove from local storage
   removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   };
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from local storage
  clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task){
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
 
}



