document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('submit-task-btn');
    const taskList = document.getElementById('tasks-list');
    const emptyImage = document.querySelector('.empty-state-image');
    const taskStatus = document.getElementById('task-status');
    const progressIndicator = document.getElementById('progress-indicator');

    // Prevent form submit default
    document.querySelector('.task-input-form').addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    // Toggle empty state image
    const toggleEmptyState = () => {
        const isEmpty = taskList.children.length === 0;
        emptyImage.style.display = isEmpty ? 'block' : 'none';
    };

    // Update task status and progress bar
    const updateStatus = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;

        taskStatus.textContent = `${completedTasks}/${totalTasks}`;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressIndicator.style.width = `${percentage}%`;
    };

    // Add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.classList.add('task-item');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                textSpan.classList.add('completed');
            } else {
                textSpan.classList.remove('completed');
            }
            updateStatus();
        });

        // Text span
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        textSpan.classList.add('task-text');

        // Edit button
        const editBtn = document.createElement('span');
        editBtn.innerHTML = '<i class="fa fa-pen"></i>';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (li.classList.contains('editing')) return;

            li.classList.add('editing');
            const currentText = textSpan.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.classList.add('edit-input');

            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText) {
                    textSpan.textContent = newText;
                }
                li.classList.remove('editing');
                input.replaceWith(textSpan);
            };

            input.addEventListener('keypress', (ev) => {
                if (ev.key === 'Enter') {
                    saveEdit();
                }
            });

            input.addEventListener('blur', () => saveEdit());

            textSpan.replaceWith(input);
            input.focus();
        });

        // Delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(li);
            toggleEmptyState();
            updateStatus();
        });

        // Append all to list item
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = '';
        toggleEmptyState();
        updateStatus();
    };

    // Add via button
    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    // Add via Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Initial state
    toggleEmptyState();
    updateStatus();
});



