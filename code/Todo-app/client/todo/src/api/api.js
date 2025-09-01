import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Network error
    if (!error.response) {
      throw new Error('Network error - please check if the server is running');
    }
    
    // HTTP error responses
    const { status, data } = error.response;
    let errorMessage = 'An error occurred';
    
    switch (status) {
      case 400:
        errorMessage = data?.error || 'Bad request - please check your input';
        break;
      case 404:
        errorMessage = data?.error || 'Resource not found';
        break;
      case 500:
        errorMessage = data?.error || 'Server error - please try again later';
        break;
      default:
        errorMessage = data?.error || `HTTP ${status} error`;
    }
    
    throw new Error(errorMessage);
  }
);

// Task API methods
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch task ${id}:`, error);
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update task ${id}:`, error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete task ${id}:`, error);
      throw error;
    }
  },

  // Toggle task completion
  toggleTaskCompletion: async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error(`Failed to toggle task ${id}:`, error);
      throw error;
    }
  },
};

// Category API methods
export const categoryApi = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error);
      throw error;
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update category ${id}:`, error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete category ${id}:`, error);
      throw error;
    }
  },

  // Get tasks for category
  getCategoryTasks: async (id) => {
    try {
      const response = await api.get(`/categories/${id}/tasks`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch tasks for category ${id}:`, error);
      throw error;
    }
  },
};

export default api;