import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const mockCategories = [
  { id: 1, name: 'Work' },
  { id: 2, name: 'Personal' },
];

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addTask } = useTaskStore();

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
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create Task</h2>
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
          {mockCategories.map((cat) => (
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default CreateTaskPage;