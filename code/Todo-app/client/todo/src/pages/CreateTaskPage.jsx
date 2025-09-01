import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState('medium');
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { 
    addTask, 
    categories, 
    fetchCategories, 
    loading, 
    error: storeError, 
    clearError 
  } = useTaskStore();

  useEffect(() => {
    console.log('CreateTaskPage mounted, fetching categories...');
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    console.log('Categories loaded for CreateTaskPage:', categories);
  }, [categories]);

  const validateForm = () => {
    if (!title.trim()) {
      setFormError('Task title is required');
      return false;
    }
    if (title.length > 200) {
      setFormError('Task title must be less than 200 characters');
      return false;
    }
    if (description.length > 1000) {
      setFormError('Description must be less than 1000 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const task = { 
        title: title.trim(), 
        description: description.trim(), 
        categoryId: categoryId || null, 
        priority 
      };
      console.log('Submitting task to addTask:', task);
      await addTask(task);
      console.log('Task submission completed, navigating back');
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error);
      setFormError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentError = formError || storeError;

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Task</h2>
      </div>

      {currentError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{currentError}</span>
            <button 
              onClick={() => {
                setFormError(null);
                clearError();
              }}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {loading && categories.length === 0 && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          Loading categories...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={200}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            {title.length}/200 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            maxLength={1000}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 h-24 resize-y disabled:bg-gray-100"
          />
          <div className="text-xs text-gray-500 mt-1">
            {description.length}/1000 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </span>
            ) : (
              'Create Task'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            disabled={isSubmitting}
            className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition duration-300 disabled:bg-gray-400"
          >
            Categories
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;