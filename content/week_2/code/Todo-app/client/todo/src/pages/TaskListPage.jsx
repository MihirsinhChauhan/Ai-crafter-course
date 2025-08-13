import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

const mockTasks = [
  { id: 1, title: 'Finish project proposal', isComplete: false, categoryId: 1, priority: 'HIGH' },
  { id: 2, title: 'Buy groceries', isComplete: true, categoryId: 2, priority: 'MEDIUM' },
  { id: 3, title: 'Call client', isComplete: false, categoryId: 1, priority: 'LOW' },
];

const TaskListPage = () => {
  const navigate = useNavigate();

  const handleToggleStatus = (id) => {
    console.log(`Toggle status for task ${id}`);
  };

  const handleEdit = (task) => {
    console.log(`Edit task ${task.id}`);
    // Navigate to /edit/:id (not implemented yet)
  };

  const handleDelete = (id) => {
    console.log(`Delete task ${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h1>
      {mockTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No tasks, create one!</p>
          <button
            onClick={() => navigate('/create')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {mockTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={() => handleToggleStatus(task.id)}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      )}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default TaskListPage;