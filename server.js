const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Todo items (in-memory store for simplicity)
let todos = [];

// API route to get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// API route to add a new todo
app.post('/api/todos', (req, res) => {
  const { task, priority, dueDate } = req.body;
  if (task) {
    todos.push({ task, completed: false, priority: priority || 'low', dueDate: dueDate || null });
    res.status(201).json({ message: 'Todo added!' });
  } else {
    res.status(400).json({ message: 'Task cannot be empty' });
  }
});

// API route to delete a todo by index
app.delete('/api/todos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    res.status(200).json({ message: 'Todo deleted!' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// API route to toggle task completion
app.patch('/api/todos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < todos.length) {
    todos[index].completed = !todos[index].completed;
    res.status(200).json({ message: 'Task status updated!' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
