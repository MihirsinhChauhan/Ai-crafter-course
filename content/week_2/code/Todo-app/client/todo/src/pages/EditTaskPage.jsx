import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const EditTaskPage = () => {
  const { id } = useParams();
  const { tasks, updateTask, categories } = useTaskStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [error, setError] = useState(null);

  useEffect(() => {
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setCategoryId(task.categoryId || '');
      setPriority(task.priority || 'MEDIUM');
    }
    console.log('Categories loaded for EditTaskPage:', categories);
  }, [id, tasks, categories]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title Required');
      return;
    }
    setError(null);
    const updatedTask = { title, description, categoryId, priority };
    console.log('Updating task with id:', id, 'Data:', updatedTask);
    await updateTask(parseInt(id), updatedTask);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Task</h2>
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;