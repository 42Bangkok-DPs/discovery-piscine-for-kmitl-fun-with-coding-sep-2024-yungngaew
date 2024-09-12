document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');

    loadTodos();

    newBtn.addEventListener('click', function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const div = document.createElement('div');
        div.className = 'todo-item';
        
        const todoText = document.createElement('span');
        todoText.textContent = todo;
        div.appendChild(todoText);

        div.addEventListener('click', function() {
            if (confirm(`Do you want to remove this TO DO: "${todo}"?`)) {
                ftList.removeChild(div);
                saveTodos();
            }
        });

        ftList.insertBefore(div, ftList.firstChild);
    }

    function saveTodos() {
        const todos = Array.from(ftList.children).map((div, index) => div.firstChild.textContent);
        
        document.cookie.split('; ').forEach(cookie => {
            if (cookie.startsWith('todo_')) {
                document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            }
        });

        todos.forEach((todo, index) => {
            document.cookie = `todo_${index}=${encodeURIComponent(todo)}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
        });
    }

    function loadTodos() {
        const cookies = document.cookie.split('; ');
        cookies.forEach(cookie => {
            if (cookie.startsWith('todo_')) {
                const todo = decodeURIComponent(cookie.split('=')[1]);
                addTodo(todo);
            }
        });
    }
});
