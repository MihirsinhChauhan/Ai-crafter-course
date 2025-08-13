# TODO App Frontend Implementation Plan

This document outlines the step-by-step plan for building the frontend of a TODO app using React, aligning with the app’s core functionalities (Task Creation, Task Editing/Deletion, Task Status Tracking, Task Categorization, Task Prioritization), app flow diagram, state diagram, and sequence diagram. The plan uses Vite for project setup, React Router for navigation, Tailwind CSS via CDN for styling, and Zustand for state management. It assumes placeholder RESTful API endpoints (`POST /tasks`, `GET /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`, `GET /categories`) for backend integration, as no SQL schema or ER diagram is provided.

## 1. Project Setup

### Objective
Set up a React project using Vite for fast development, install necessary dependencies, and establish a modular project structure.

### Steps
1. **Initialize Project with Vite**:
   - Run `npm create vite@latest todo-app -- --template react` to create a React project.
   - Navigate to the project directory: `cd todo-app`.
   - Install dependencies: `npm install`.
2. **Install Additional Dependencies**:
   - Install Zustand for state management: `npm install zustand`.
   - Install Axios for API calls: `npm install axios`.
   - Use React, React DOM, and React Router via CDN (from cdn.jsdelivr.net) to minimize local dependencies.
3. **Set Up Tailwind CSS via CDN**:
   - Include Tailwind CSS in `index.html` using the CDN link.
4. **Project Structure**:
   - Organize the project for modularity and scalability:
     ```
     todo-app/
     ├── public/
     ├── src/
     │   ├── components/
     │   │   ├── TaskList.jsx
     │   │   ├── TaskItem.jsx
     │   │   ├── TaskForm.jsx
     │   │   ├── CategoryManager.jsx
     │   │   ├── CategoryForm.jsx
     │   ├── pages/
     │   │   ├── TaskListPage.jsx
     │   │   ├── CreateTaskPage.jsx
     │   │   ├── EditTaskPage.jsx
     │   │   ├── CategoryManagementPage.jsx
     │   ├── store/
     │   │   ├── taskStore.js
     │   ├── api/
     │   │   ├── api.js
     │   ├── App.jsx
     │   ├── main.jsx
     │   ├── index.css
     ├── tests/
     │   ├── TaskList.test.jsx
     │   ├── TaskForm.test.jsx
     ├── index.html
     ├── package.json
     ├── vite.config.js
     ```

### Code Snippets
**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TODO App</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-router-dom@6.4.0/dist/umd/react-router-dom.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**package.json**:
```json
{
  "name": "todo-app",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "zustand": "^4.5.5"
  },
  "devDependencies": {
    "vite": "^5.4.1",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "jest": "^29.7.0"
  }
}
```

## 2. Component Architecture

### Objective
Design a modular component hierarchy based on the app flow diagram, ensuring reusability and alignment with core functionalities (Task Creation, Editing/Deletion, Status Tracking, Categorization, Prioritization).

### Component Hierarchy
1. **TaskList**:
   - **Props**: `tasks`, `onToggleStatus`, `onEdit`, `onDelete`
   - **Responsibility**: Displays a list of tasks, handles empty state, and triggers task actions (toggle status, edit, delete). Aligns with the Task List Screen in the app flow diagram.
2. **TaskItem**:
   - **Props**: `task`, `onToggleStatus`, `onEdit`, `onDelete`
   - **Responsibility**: Renders a single task with strikethrough for completed tasks (per state diagram), handles status toggle, edit, and delete actions.
3. **TaskForm**:
   - **Props**: `initialTask`, `categories`, `onSubmit`, `isEditMode`
   - **Responsibility**: Handles task creation and editing, including title, description, category, and priority inputs. Validates title (non-empty) per sequence diagram.
4. **CategoryManager**:
   - **Props**: `categories`, `onCreateCategory`
   - **Responsibility**: Manages category creation and display, aligns with Category Management Screen in the app flow diagram.
5. **CategoryForm**:
   - **Props**: `onSubmit`
   - **Responsibility**: Handles category creation input and submission.
6. **App**:
   - **Props**: None
   - **Responsibility**: Root component with routing setup for TaskListPage, CreateTaskPage, EditTaskPage, and CategoryManagementPage.

### Sample Component
**TaskItem.jsx**:
```jsx
import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onToggleStatus(task.id)}
          className="mr-2"
        />
        <span className={task.isComplete ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
      <div>
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
```

## 3. State Management

### Objective
Use Zustand for lightweight state management, mapping state to the SQL schema (assumed: `tasks(id, title, description, isComplete, categoryId, priority)`, `categories(id, name)`) and UML class diagram (Task, Category, Priority).

### Strategy
- **Zustand Store**: Create a single store (`taskStore.js`) to manage tasks and categories, reflecting the TaskManager and CategoryManager classes.
- **State**:
  - `tasks`: Array of task objects `{ id, title, description, isComplete, categoryId, priority }`.
  - `categories`: Array of category objects `{ id, name }`.
  - `loading`: Boolean for API call status.
  - `error`: String for error messages.
- **Actions**:
  - `fetchTasks`: Fetch all tasks (GET /tasks).
  - `addTask`: Create a task (POST /tasks).
  - `updateTask`: Edit a task (PUT /tasks/:id).
  - `deleteTask`: Delete a task (DELETE /tasks/:id).
  - `toggleTaskStatus`: Update task status (PUT /tasks/:id).
  - `fetchCategories`: Fetch all categories (GET /categories).
  - `addCategory`: Create a category (POST /categories).
- **Alignment**:
  - Maps to SQL schema: `tasks` table (title, description, isComplete, categoryId, priority), `categories` table (name).
  - Reflects UML classes: Task (attributes), Category (attributes), TaskManager (task operations), CategoryManager (category operations).

### Sample Store
**taskStore.js**:
```javascript
import { create } from 'zustand';
import * as api from '../api/api';

const useTaskStore = create((set) => ({
  tasks: [],
  categories: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await api.getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  addTask: async (task) => {
    set({ loading: true });
    try {
      const newTask = await api.createTask(task);
      set((state) => ({ tasks: [...state.tasks, newTask], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // Additional actions: updateTask, deleteTask, toggleTaskStatus, fetchCategories, addCategory
}));

export default useTaskStore;
```

## 4. API Integration

### Objective
Integrate with placeholder RESTful APIs (`POST /tasks`, `GET /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`, `GET /categories`, `POST /categories`) using Axios, handling loading and error states.

### Strategy
- Use Axios for HTTP requests.
- Define API functions in `api/api.js`.
- Handle loading/error states in Zustand store.
- Assume no authentication for simplicity (JWT can be added later by including Authorization headers).

### Sample API Call
**api/api.js**:
```javascript
import axios from 'axios';

const BASE_URL = 'https://api.todoapp.com'; // Placeholder

export const createTask = async (task) => {
  if (!task.title) throw new Error('Title Required');
  const response = await axios.post(`${BASE_URL}/tasks`, task);
  return response.data;
};

export const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

// Additional endpoints: updateTask, deleteTask, getCategories, createCategory
```

## 5. Routing

### Objective
Set up client-side routing using React Router based on the app flow diagram, mapping routes to TaskListPage, CreateTaskPage, EditTaskPage, and CategoryManagementPage.

### Routes
- `/`: TaskListPage (Task List Screen, displays tasks or empty state).
- `/create`: CreateTaskPage (Create Task Screen).
- `/edit/:id`: EditTaskPage (Edit Task Screen).
- `/categories`: CategoryManagementPage (Category Management Screen).

### Sample Routing Setup
**App.jsx**:
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import CategoryManagementPage from './pages/CategoryManagementPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
        <Route path="/categories" element={<CategoryManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

## 6. Styling

### Objective
Implement a consistent, responsive design system using Tailwind CSS via CDN, inspired by Todoist’s clean and minimal aesthetic (light background, bold task titles, subtle colors for categories/priorities).

### Strategy
- Use Tailwind classes for layout, typography, and colors.
- Ensure accessibility (e.g., sufficient contrast, keyboard navigation).
- Support mobile (flexbox, responsive padding) and desktop (wider layouts).
- Apply strikethrough for completed tasks (per state diagram).

### Sample Styled Component
**TaskList.jsx**:
```jsx
import React from 'react';
import TaskItem from './TaskItem';
import useTaskStore from '../store/taskStore';

const TaskList = () => {
  const { tasks, fetchTasks, toggleTaskStatus, deleteTask } = useTaskStore();
  
  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks, create one!</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onEdit={() => navigate(`/edit/${task.id}`)}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/create')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
```

## 7. User Interaction Flows

### Objective
Map user interactions from the sequence diagram (Task Creation) to React components, handling form submissions, validation, and feedback using button click handlers.

### Mapping
- **Sequence Diagram (Task Creation)**:
  - User clicks “Add Task” → UI shows form (CreateTaskPage).
  - User enters title, description, category, priority → UI validates and submits.
  - TaskManager validates title and category → UI displays success/error.
- **Components**:
  - **TaskForm**: Handles input and validation.
  - **CreateTaskPage**: Wraps TaskForm for task creation.
  - **EditTaskPage**: Reuses TaskForm for editing.

### Sample Form Component
**TaskForm.jsx**:
```jsx
import React, { useState } from 'react';
import useTaskStore from '../store/taskStore';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ initialTask = {}, categories, isEditMode = false }) => {
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [categoryId, setCategoryId] = useState(initialTask.categoryId || '');
  const [priority, setPriority] = useState(initialTask.priority || 'MEDIUM');
  const [error, setError] = useState(null);
  const { addTask, updateTask } = useTaskStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title Required');
      return;
    }
    setError(null);
    const task = { title, description, categoryId, priority };
    try {
      if (isEditMode) {
        await updateTask(initialTask.id, task);
      } else {
        await addTask(task);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditMode ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
```

## 8. Testing

### Objective
Define a testing strategy using Jest and React Testing Library, focusing on unit tests for components and integration tests for API-driven flows.

### Strategy
- **Unit Tests**: Test TaskItem (rendering, strikethrough), TaskForm (validation, submission).
- **Integration Tests**: Test TaskListPage (fetching tasks, empty state), CreateTaskPage (form submission, API call).
- **Test Cases**:
  1. TaskItem renders task title and applies strikethrough for completed tasks.
  2. TaskForm shows error for empty title.
  3. TaskListPage displays empty state when no tasks exist.
  4. CreateTaskPage submits valid task and navigates to TaskListPage.
  5. TaskListPage fetches and displays tasks from API.

### Sample Test Case
**TaskForm.test.jsx**:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { BrowserRouter } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

jest.mock('../store/taskStore');

describe('TaskForm', () => {
  it('shows error for empty title', async () => {
    useTaskStore.mockReturnValue({ addTask: jest.fn(), updateTask: jest.fn() });
    render(
      <BrowserRouter>
        <TaskForm categories={[{ id: 1, name: 'Work' }]} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Create Task'));
    expect(screen.getByText('Title Required')).toBeInTheDocument();
  });
});
```

## 9. Deployment

### Objective
Deploy the React frontend on Vercel, ensuring compatibility with the backend and proper environment variable setup.

### Steps
1. **Build the App**:
   - Run `npm run build` to generate the production build (`dist/` folder).
2. **Set Up Vercel**:
   - Create a Vercel account and install the Vercel CLI: `npm install -g vercel`.
   - Run `vercel` in the project directory to deploy.
   - Configure environment variables in Vercel dashboard (e.g., `VITE_API_BASE_URL=https://api.todoapp.com`).
3. **Ensure Backend Compatibility**:
   - Verify API base URL points to the deployed backend.
   - Test API connectivity post-deployment.
4. **Deployment Configuration**:
   - Use `vercel.json` for custom settings (e.g., rewrites for SPA routing).

### Sample Deployment Configuration
**vercel.json**:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "builds": [{ "src": "index.html", "use": "@vercel/static-build" }]
}
```

## Conclusion
This plan provides a modular, scalable approach to building the TODO app frontend, aligning with the app flow diagram (Task List, Create Task, Category Management screens), state diagram (task lifecycle with strikethrough for completed tasks), and sequence diagram (task creation process). The use of Vite, React Router, Tailwind CSS, and Zustand ensures a modern, responsive, and maintainable codebase. Placeholder APIs allow testing, with room for JWT authentication later. The testing and deployment strategies ensure reliability and accessibility.