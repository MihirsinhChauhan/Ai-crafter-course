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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Categories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="mb-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name"
            className="w-full p-3 border border-teal-700 rounded-lg focus:border-teal-500"
          />
          <button
            onClick={handleAddCategory}
            className="mt-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 w-full"
          >
            Add Category
          </button>
        </div>
        <ul className="space-y-4 max-h-[50vh] overflow-y-auto">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              {editCategoryId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="w-3/4 p-2 border border-teal-700 rounded-lg focus:border-teal-500"
                  />
                  <button
                    onClick={() => handleUpdateCategory(category.id)}
                    className="bg-teal-700 text-white px-3 py-2 rounded-lg hover:bg-teal-600 ml-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-800">{category.name}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditCategoryId(category.id);
                        setEditCategoryName(category.name);
                      }}
                      className="text-teal-700 mr-2 hover:text-teal-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-700 hover:text-red-500"
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
          className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 w-full"
        >
          Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default CategoryManagementPage;