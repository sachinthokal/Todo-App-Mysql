
const API_URL = '/api/tasks';

function fetchTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('taskList');
            list.innerHTML = '';
            data.forEach(task => {
                const item = document.createElement('li');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.innerHTML = \`
                    <span style="\${task.completed ? 'text-decoration: line-through;' : ''}">\${task.title}</span>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="toggleTask(\${task.id})">✔</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(\${task.id})">🗑</button>
                    </div>
                \`;
                list.appendChild(item);
            });
        });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return;
    fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
    }).then(() => {
        input.value = '';
        fetchTasks();
    });
}

function toggleTask(id) {
    fetch(\`\${API_URL}/\${id}\`, {method: 'PUT'}).then(fetchTasks);
}

function deleteTask(id) {
    fetch(\`\${API_URL}/\${id}\`, {method: 'DELETE'}).then(fetchTasks);
}

fetchTasks();
