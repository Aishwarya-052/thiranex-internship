// ==========================================
// 1. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// DOM Element Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sync state with localStorage and trigger re-render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

// ==========================================
// 2. CRUD OPERATIONS
// ==========================================

// CREATE
function addTodo(text) {
  const newTodo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    isEditing: false
  };
  todos.push(newTodo);
  saveAndRender();
}

// READ / RENDER ENGINE
function render() {
  todoList.innerHTML = '';

  // ADVANCED FILTERING LOGIC
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // DYNAMIC DOM ELEMENT CREATION
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    // Build internal content conditionally based on edit state
    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" class="toggle-chk" ${todo.completed ? 'checked' : ''}>
        ${todo.isEditing 
          ? `<input type="text" class="todo-text-input" value="${todo.text}">` 
          : `<span class="todo-text">${todo.text}</span>`
        }
      </div>
      <div class="actions">
        ${todo.isEditing 
          ? `<button class="save-btn">Save</button>` 
          : `<button class="edit-btn">Edit</button>`
        }
        <button class="delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// UPDATE (Status Toggle)
function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveAndRender();
}

// UPDATE (Toggle Edit Mode)
function toggleEditMode(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
  );
  render(); // No localstorage save needed just for entering edit state
}

// UPDATE (Save new text value)
function saveTodoEdit(id, newText) {
  if (!newText.trim()) return deleteTodo(id);
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, text: newText.trim(), isEditing: false } : todo
  );
  saveAndRender();
}

// DELETE
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveAndRender();
}

// ==========================================
// 3. EVENT HANDLING & DELEGATION
// ==========================================

// Form Submission Event
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (todoInput.value.trim()) {
    addTodo(todoInput.value);
    todoInput.value = '';
  }
});

// DELEGATED EVENT LISTENER (Handles actions inside the dynamic list items)
todoList.addEventListener('click', (e) => {
  const target = e.target;
  const todoItem = target.closest('.todo-item');
  if (!todoItem) return;
  const id = todoItem.dataset.id;

  // Toggle checkbox completion
  if (target.classList.contains('toggle-chk')) {
    toggleTodo(id);
  }
  
  // Delete handler
  if (target.classList.contains('delete-btn')) {
    deleteTodo(id);
  }

  // Edit toggle handler
  if (target.classList.contains('edit-btn')) {
    toggleEditMode(id);
  }

  // Save edit handler
  if (target.classList.contains('save-btn')) {
    const inputField = todoItem.querySelector('.todo-text-input');
    saveTodoEdit(id, inputField.value);
  }
});

// Filter Tab Switch Event Handler
document.querySelector('.filter-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.dataset.filter;
    render();
  }
});

// Initial View Render on page load
render();
