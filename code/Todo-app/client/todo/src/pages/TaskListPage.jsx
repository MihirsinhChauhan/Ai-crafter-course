import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import useTaskStore from '../store/taskStore';

const TaskListPage = () => {
  const { 
    tasks, 
    categories, 
    fetchTasks, 
    fetchCategories, 
    loading, 
    error, 
    deleteTask, 
    toggleTask,
    clearError 
  } = useTaskStore();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    console.log('TaskListPage mounted, fetching data...');
    fetchTasks();
    fetchCategories();
  }, [fetchTasks, fetchCategories]);

  console.log('Rendering TaskListPage with tasks:', tasks, 'Loading:', loading, 'Error:', error);

  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(id);
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700"></div>
          <p className="ml-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Tasks</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={clearError}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {tasks.length === 0 && !loading ? (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-md">
          <p className="mb-4">No tasks yet, create your first one!</p>
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
                <div key={task.id} className="relative">
                  <TaskItem
                    task={{
                      ...task,
                      categoryName: getCategoryName(task.categoryId)
                    }}
                    onToggleStatus={() => handleToggleTask(task.id)}
                    onEdit={() => navigate(`/edit/${task.id}`)}
                    onDelete={() => handleDeleteTask(task.id)}
                    isDeleting={isDeleting === task.id}
                  />
                  {isDeleting === task.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                    </div>
                  )}
                </div>
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
        <button
          onClick={() => {
            fetchTasks();
            fetchCategories();
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default TaskListPage;