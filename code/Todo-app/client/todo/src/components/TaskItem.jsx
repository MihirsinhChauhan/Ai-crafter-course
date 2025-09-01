import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete, isDeleting = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`p-4 bg-gray-50 rounded-lg border transition-all duration-200 ${
      task.isComplete ? 'opacity-75' : ''
    } ${isDeleting ? 'pointer-events-none' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.isComplete || false}
            onChange={onToggleStatus}
            disabled={isDeleting}
            className="mt-1 h-4 w-4 text-teal-600 rounded focus:ring-teal-500"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 ${
              task.isComplete ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.isComplete ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-xs">
              {task.priority && (
                <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
              {task.categoryName && task.categoryName !== 'No Category' && (
                <span className="text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {task.categoryName}
                </span>
              )}
              {task.createdAt && (
                <span className="text-gray-400">
                  Created: {formatDate(task.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={onEdit}
            disabled={isDeleting}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded transition-colors duration-200 disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition-colors duration-200 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;