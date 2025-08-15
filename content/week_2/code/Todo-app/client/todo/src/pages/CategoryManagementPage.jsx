import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const CategoryManagementPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useTaskStore();
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // No fetch needed, categories are managed in-store
    console.log('Categories loaded:', categories);
  }, [categories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }
    setError(null);
    await addCategory({ name: newCategoryName });
    setNewCategoryName('');
  };

  const handleUpdateCategory = async (id) => {
    if (!editCategoryName.trim()) {
      setError('Category name is required');
      return;
    }
    setError(null);
    await updateCategory(id, { name: editCategoryName });
    setEditCategoryId(null);
    setEditCategoryName('');
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Categories</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Category
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            {editCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="w-3/4 p-1 border rounded"
                />
                <button
                  onClick={() => handleUpdateCategory(category.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                    }}
                    className="text-blue-500 mr-2 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back to Tasks
      </button>
    </div>
  );
};

export default CategoryManagementPage;