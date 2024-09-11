document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');

    loadTodos();

    // Event listener for adding new TO DO
    newBtn.addEventListener('click', function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    // Function to add a TO DO item
    function addTodo(todo) {
        const div = document.createElement('div');
        div.className = 'todo-item';
        
        const todoText = document.createElement('span');
        todoText.textContent = todo;
        div.appendChild(todoText);

        // Event listener to remove TO DO when clicking on the list item
        div.addEventListener('click', function() {
            if (confirm(`Do you want to remove this TO DO: "${todo}"?`)) {
                ftList.removeChild(div);
                saveTodos();
            }
        });

        // Insert the new item at the top of the list
        ftList.insertBefore(div, ftList.firstChild);
    }

    // Function to save TO DOs to cookies
    function saveTodos() {
        const todos = Array.from(ftList.children).map(div => div.firstChild.textContent);
        document.cookie = `todos=${JSON.stringify(todos)}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
    }

    // Function to load TO DOs from cookies
    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            todos.forEach(addTodo);
        }
    }
});
