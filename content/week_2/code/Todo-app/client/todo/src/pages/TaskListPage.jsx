import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import useTaskStore from '../store/taskStore';

const TaskListPage = () => {
  const { tasks, fetchTasks, loading, error, updateTask, deleteTask } = useTaskStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('TaskListPage mounted, calling fetchTasks');
    fetchTasks();
  }, [fetchTasks]);

  console.log('Rendering TaskListPage with tasks:', tasks, 'Loading:', loading, 'Error:', error);

  if (loading) return <p className="text-gray-500 text-center py-8">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h1>
      {tasks.length === 0 ? (
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
          {tasks.map((task) => {
            console.log('Rendering TaskItem for task:', task);
            return (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={() => console.log(`Toggle status for task ${task.id}`)}
                onEdit={() => navigate(`/edit/${task.id}`)}
                onDelete={() => deleteTask(task.id)}
              />
            );
          })}
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