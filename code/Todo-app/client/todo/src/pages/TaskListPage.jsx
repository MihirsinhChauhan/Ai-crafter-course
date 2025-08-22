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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Tasks</h1>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-md">
          <p className="mb-4">No tasks, create one!</p>
          <button
            onClick={() => navigate('/create')}
            className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
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
        </div>
      )}
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => navigate('/create')}
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300 w-full sm:w-auto"
        >
          Add Task
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 w-full sm:w-auto"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default TaskListPage;