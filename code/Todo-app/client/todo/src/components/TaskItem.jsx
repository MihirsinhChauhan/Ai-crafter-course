import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={onToggleStatus}
          className="mr-2"
        />
        <span className={task.isComplete ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
      <div>
        <button
          onClick={onEdit}
          className="text-blue-500 mr-2 hover:text-blue-700 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;