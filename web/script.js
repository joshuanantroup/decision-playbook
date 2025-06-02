(function() {
    const summary = document.getElementById('summary');
    const toggleSummary = document.getElementById('toggleSummary');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTask');
    const resetBtn = document.getElementById('resetTasks');
    const progressDiv = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');

    toggleSummary.addEventListener('click', () => {
        summary.classList.toggle('hidden');
    });

    const defaultTasks = [
        {text: 'Review Life North Star', done: false},
        {text: 'Set MITs for the day', done: false},
        {text: 'Evening reflection journal', done: false}
    ];

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks') || 'null');
        if(!tasks) {
            tasks = defaultTasks;
            saveTasks(tasks);
        }
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
            const del = document.createElement('button');
            del.textContent = '✕';
            del.className = 'delete';
            del.addEventListener('click', () => {
                tasks.splice(index,1);
                saveTasks(tasks);
                loadTasks();
            });

            li.appendChild(cb);
            li.appendChild(span);
            li.appendChild(del);
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

    resetBtn.addEventListener('click', () => {
        if(confirm('Clear all tasks?')) {
            saveTasks(defaultTasks.map(t => ({...t, done:false})));
            loadTasks();
        }
    });

    function updateProgress() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const done = tasks.filter(t => t.done).length;
        const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
        progressDiv.textContent = `Completed ${done}/${tasks.length} tasks`;
        progressBar.value = pct;
    }

    loadTasks();
})();
