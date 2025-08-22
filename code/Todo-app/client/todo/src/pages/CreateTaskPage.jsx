import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addTask, categories } = useTaskStore();

  useEffect(() => {
    console.log('Categories loaded for CreateTaskPage:', categories);
  }, [categories]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title Required');
      return;
    }
    setError(null);
    const task = { title, description, categoryId, priority };
    console.log('Submitting task to addTask:', task);
    await addTask(task);
    console.log('Task submission completed, navigating back');
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-3 border border-teal-700 rounded-lg focus:border-teal-500"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-3 border border-teal-700 rounded-lg focus:border-teal-500 h-24 resize-y"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-teal-700 rounded-lg focus:border-teal-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border border-teal-700 rounded-lg focus:border-teal-500"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300 w-full"
        >
          Create Task
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 w-full"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default CreateTaskPage;