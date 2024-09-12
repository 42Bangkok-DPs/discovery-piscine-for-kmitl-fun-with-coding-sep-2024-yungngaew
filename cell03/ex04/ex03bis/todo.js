
        $(document).ready(function() {
            const $ftList = $('#ft_list');
            const $newBtn = $('#newBtn');

            loadTodos();

            $newBtn.on('click', function() {
                const todo = prompt('Enter a new TO DO:');
                if (todo && todo.trim() !== '') {
                    addTodo(todo);
                    saveTodos();
                }
            });

            function addTodo(todo) {
                const $div = $('<div></div>').addClass('todo-item');
                const $todoText = $('<span></span>').text(todo);

                $div.append($todoText);

                $div.on('click', function() {
                    if (confirm(`Do you want to remove this TO DO: "${todo}"?`)) {
                        $div.remove();
                        saveTodos();
                    }
                });

                $ftList.prepend($div);
            }

            function saveTodos() {
                const todos = $ftList.children().map(function() {
                    return $(this).text();
                }).get();

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
