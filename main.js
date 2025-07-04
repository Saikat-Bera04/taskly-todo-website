// Update clock and calendar on main page
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const calendar = document.getElementById('calendar');
    
    if (clock) {
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clock.textContent = timeString;
    }
    
    if (calendar) {
        const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        calendar.textContent = dateString;
    }
}

// Initialize clock and update every second
if (document.getElementById('clock')) {
    updateClock();
    setInterval(updateClock, 1000);
}

// To-Do List Functionality
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');
    
    const taskText = taskInput.value.trim();
    const taskDateTime = `${taskDate.value} ${taskTime.value}`;
    
    if (taskText && taskDate.value && taskTime.value) {
        saveTask(taskText, taskDateTime);
        renderTasks();
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
    }
}

function saveTask(task, dateTime) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, dateTime: dateTime });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function renderTasks() {
    const tasksContainer = document.getElementById('tasks-container');
    if (!tasksContainer) return;
    
    const tasks = loadTasks();
    tasksContainer.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-content">
                <div>${task.text}</div>
                <div class="task-date">${formatDateTime(task.dateTime)}</div>
            </div>
            <div class="task-actions">
                <button onclick="completeTask(${index})">Done</button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

function completeTask(index) {
    let tasks = loadTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function formatDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    
    const date = new Date(year, month - 1, day, hours, minutes);
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Initialize tasks if on todo page
if (document.getElementById('tasks-container')) {
    renderTasks();
}


function renderTasks() {
    const tasksContainer = document.getElementById('tasks-container');
    if (!tasksContainer) return;
    
    const tasks = loadTasks();
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No tasks added yet';
        tasksContainer.appendChild(emptyState);
        return;
    }
    
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <div class="task-date">${formatDateTime(task.dateTime)}</div>
            </div>
            <div class="task-actions">
                <button class="done-btn" onclick="completeTask(${index})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}
// Typewriter effect for the title
function startTypewriter() {
    const text = "Windy";
    const element = document.getElementById('typewriter');
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const currentText = text.substring(0, i);
        element.textContent = currentText;
        
        if (!isDeleting && i < text.length) {
            i++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && i > 0) {
            i--;
            setTimeout(type, typingSpeed / 2);
        } else {
            isDeleting = !isDeleting;
            setTimeout(type, isDeleting ? 1500 : typingSpeed);
        }
    }
    
    type();
}
