import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const CategoryManagementPage = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    fetchCategories,
    loading,
    error: storeError,
    clearError
  } = useTaskStore();
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    console.log('CategoryManagementPage mounted, fetching categories...');
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    console.log('Categories loaded:', categories);
  }, [categories]);

  const validateCategoryName = (name) => {
    if (!name.trim()) {
      return 'Category name is required';
    }
    if (name.length > 100) {
      return 'Category name must be less than 100 characters';
    }
    // Check if category name already exists
    const normalizedName = name.trim().toLowerCase();
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === normalizedName && cat.id !== editCategoryId
    );
    if (existingCategory) {
      return 'A category with this name already exists';
    }
    return null;
  };

  const handleAddCategory = async (e) => {
    e?.preventDefault();
    setFormError(null);
    clearError();

    const validationError = validateCategoryName(newCategoryName);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await addCategory({ name: newCategoryName.trim() });
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      setFormError('Failed to add category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async (id) => {
    setFormError(null);
    clearError();

    const validationError = validateCategoryName(editCategoryName);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateCategory(id, { name: editCategoryName.trim() });
      setEditCategoryId(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
      setFormError('Failed to update category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
      setFormError('Failed to delete category. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditStart = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
    setFormError(null);
    clearError();
  };

  const handleEditCancel = () => {
    setEditCategoryId(null);
    setEditCategoryName('');
    setFormError(null);
    clearError();
  };

  const currentError = formError || storeError;

  if (loading && categories.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700"></div>
          <p className="ml-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
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

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Add new category form */}
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Category
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              maxLength={100}
              disabled={isSubmitting}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {newCategoryName.length}/100 characters
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newCategoryName.trim()}
            className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </span>
            ) : (
              'Add Category'
            )}
          </button>
        </form>

        {/* Categories list */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Existing Categories ({categories.length})
          </h3>
          {categories.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p>No categories yet. Add your first category above!</p>
            </div>
          ) : (
            <ul className="space-y-3 max-h-[40vh] overflow-y-auto">
              {categories.map((category) => (
                <li 
                  key={category.id} 
                  className={`p-4 bg-gray-50 rounded-lg border transition-all duration-200 ${
                    deletingId === category.id ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {editCategoryId === category.id ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          maxLength={100}
                          disabled={isSubmitting}
                          className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100"
                          required
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {editCategoryName.length}/100 characters
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          disabled={isSubmitting}
                          className="bg-teal-700 text-white px-3 py-2 rounded hover:bg-teal-600 transition-colors duration-200 disabled:bg-gray-400 text-sm"
                        >
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={handleEditCancel}
                          disabled={isSubmitting}
                          className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 transition-colors duration-200 disabled:bg-gray-400 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{category.name}</span>
                        {category.createdAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Created: {new Date(category.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditStart(category)}
                          disabled={deletingId === category.id}
                          className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 px-3 py-1 rounded transition-colors duration-200 disabled:opacity-50 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={deletingId === category.id}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition-colors duration-200 disabled:opacity-50 text-sm"
                        >
                          {deletingId === category.id ? (
                            <span className="flex items-center">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600 mr-1"></div>
                              Deleting...
                            </span>
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t pt-6">
          <button
            onClick={() => navigate('/create')}
            className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Create New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementPage;