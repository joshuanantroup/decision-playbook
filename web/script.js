(function() {
    const summary = document.getElementById('summary');
    const toggleSummary = document.getElementById('toggleSummary');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTask');
    const progressDiv = document.getElementById('progress');

    toggleSummary.addEventListener('click', () => {
        summary.classList.toggle('hidden');
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        taskList.innerHTML = '';
        tasks.forEach((t, index) => {
            const li = document.createElement('li');
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = t.done;
            cb.addEventListener('change', () => {
                tasks[index].done = cb.checked;
                saveTasks(tasks);
                updateProgress();
            });
            const span = document.createElement('span');
            span.textContent = t.text;
            li.appendChild(cb);
            li.appendChild(span);
            taskList.appendChild(li);
        });
        updateProgress();
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener('click', () => {
        const text = prompt('New task');
        if(!text) return;
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push({text, done:false});
        saveTasks(tasks);
        loadTasks();
    });

    function updateProgress() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const done = tasks.filter(t => t.done).length;
        progressDiv.textContent = `Completed ${done}/${tasks.length} tasks`;
    }

    loadTasks();
})();
