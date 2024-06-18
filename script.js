document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filters = document.querySelector('.filters');
    let todos = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTodo();
    });

    filters.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            filterTodos(event.target.id);
        }
    });

    function addTodo() {
        const todoText = input.value.trim();
        if (todoText === '') {
            return;
        }

        const todo = {
            text: todoText,
            completed: false,
            id: Date.now()
        };
        todos.push(todo);
        renderTodos(todos);
        input.value = '';
    }

    function renderTodos(todosToRender) {
        todoList.innerHTML = '';
        todosToRender.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.classList.toggle('completed', todo.completed);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTodo(todo.id);
            });

            li.appendChild(deleteBtn);
            li.addEventListener('click', function() {
                toggleTodoCompletion(todo.id);
            });

            todoList.appendChild(li);
        });
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(todos);
    }

    function toggleTodoCompletion(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderTodos(todos);
    }

    function filterTodos(filter) {
        let filteredTodos;
        switch (filter) {
            case 'all':
                filteredTodos = todos;
                break;
            case 'active':
                filteredTodos = todos.filter(todo => !todo.completed);
                break;
            case 'completed':
                filteredTodos = todos.filter(todo => todo.completed);
                break;
            default:
                filteredTodos = todos;
        }
        renderTodos(filteredTodos);
    }
});
