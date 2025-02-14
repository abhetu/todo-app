document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filters = document.querySelector('.filters');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTodo();
    });

    filters.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");
            filterTodos(event.target.id);
        }
    });

    function addTodo() {
        const todoText = input.value.trim();
        if (todoText === '') return;

        const todo = { text: todoText, completed: false, id: Date.now() };
        todos.push(todo);
        updateLocalStorage();
        renderTodos(todos);
        input.value = '';
    }

    function renderTodos(todosToRender) {
        todoList.innerHTML = '';
        todosToRender.forEach(todo => {
            const li = document.createElement('li');
            li.classList.toggle('completed', todo.completed);
            
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener('click', function() {
                toggleTodoCompletion(todo.id);
            });

            const span = document.createElement('span');
            span.textContent = todo.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTodo(todo.id);
            });

            li.append(checkbox, span, deleteBtn);
            todoList.appendChild(li);
        });
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        updateLocalStorage();
        renderTodos(todos);
    }

    function toggleTodoCompletion(id) {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        updateLocalStorage();
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

    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    renderTodos(todos);
});
