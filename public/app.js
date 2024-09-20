const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const prioritySelect = document.getElementById('priority-select');
const dueDateInput = document.getElementById('due-date');

// Fetch all todos from the backend
async function fetchTodos() {
  const response = await fetch('/api/todos');
  const todos = await response.json();
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center p-2 bg-gray-200 rounded-md";

    // Task with priority and due date
    const taskContent = document.createElement('span');
    taskContent.textContent = `${todo.task} (${todo.priority}) - Due: ${todo.dueDate || 'No date'}`;

    // Checkbox to mark task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleComplete(index);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = "text-red-500 hover:text-red-700";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    // Append elements
    li.prepend(checkbox);
    li.appendChild(taskContent);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Add new todo by calling backend API
todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const task = todoInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;
  
  if (task) {
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, priority, dueDate }),
    });
    todoInput.value = '';
    fetchTodos();
  }
});

// Delete todo by index
async function deleteTask(index) {
  await fetch(`/api/todos/${index}`, {
    method: 'DELETE',
  });
  fetchTodos();
}

// Toggle task completion
async function toggleComplete(index) {
  await fetch(`/api/todos/${index}`, {
    method: 'PATCH',
  });
  fetchTodos();
}

// Initial fetch of todos
fetchTodos();
