import { create } from 'zustand';
import { taskApi, categoryApi } from '../api/api';

const useTaskStore = create((set) => ({
  tasks: [],
  categories: [],
  loading: false,
  error: null,
  
  // Clear error
  clearError: () => set({ error: null }),

  // Fetch all tasks from backend
  fetchTasks: async () => {
    console.log('Fetching tasks from backend...');
    set({ loading: true, error: null });
    try {
      const tasks = await taskApi.getAllTasks();
      console.log('Fetched tasks:', tasks);
      set({ tasks: tasks || [], loading: false });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Fetch all categories from backend
  fetchCategories: async () => {
    console.log('Fetching categories from backend...');
    set({ loading: true, error: null });
    try {
      const categories = await categoryApi.getAllCategories();
      console.log('Fetched categories:', categories);
      set({ categories: categories || [], loading: false });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Add new task
  addTask: async (task) => {
    console.log('Adding task:', task);
    set({ loading: true, error: null });
    try {
      // Convert categoryId to number if it exists and is not empty
      const taskData = {
        ...task,
        categoryId: task.categoryId && task.categoryId !== '' ? parseInt(task.categoryId) : null,
      };
      
      const newTask = await taskApi.createTask(taskData);
      console.log('Task created:', newTask);
      
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
      
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update existing task
  updateTask: async (id, updatedTask) => {
    console.log('Updating task with id:', id, 'Data:', updatedTask);
    set({ loading: true, error: null });
    try {
      // Convert categoryId to number if it exists and is not empty
      const taskData = {
        ...updatedTask,
        categoryId: updatedTask.categoryId && updatedTask.categoryId !== '' ? parseInt(updatedTask.categoryId) : null,
      };
      
      const updated = await taskApi.updateTask(id, taskData);
      console.log('Task updated:', updated);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updated : task
        ),
        loading: false,
      }));
      
      return updated;
    } catch (error) {
      console.error('Error updating task:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    console.log('Deleting task with id:', id);
    set({ loading: true, error: null });
    try {
      await taskApi.deleteTask(id);
      console.log('Task deleted');
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Toggle task completion
  toggleTask: async (id) => {
    console.log('Toggling task with id:', id);
    set({ error: null });
    try {
      const updatedTask = await taskApi.toggleTaskCompletion(id);
      console.log('Task toggled:', updatedTask);
      
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
      }));
      
      return updatedTask;
    } catch (error) {
      console.error('Error toggling task:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    console.log('Getting task by id:', id);
    try {
      const task = await taskApi.getTaskById(id);
      console.log('Task fetched:', task);
      return task;
    } catch (error) {
      console.error('Error getting task:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Add new category
  addCategory: async (category) => {
    console.log('Adding category:', category);
    set({ loading: true, error: null });
    try {
      const newCategory = await categoryApi.createCategory(category);
      console.log('Category created:', newCategory);
      
      set((state) => ({
        categories: [...state.categories, newCategory],
        loading: false,
      }));
      
      return newCategory;
    } catch (error) {
      console.error('Error adding category:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update existing category
  updateCategory: async (id, updatedCategory) => {
    console.log('Updating category with id:', id, 'Data:', updatedCategory);
    set({ loading: true, error: null });
    try {
      const updated = await categoryApi.updateCategory(id, updatedCategory);
      console.log('Category updated:', updated);
      
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updated : cat
        ),
        loading: false,
      }));
      
      return updated;
    } catch (error) {
      console.error('Error updating category:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    console.log('Deleting category with id:', id);
    set({ loading: true, error: null });
    try {
      await categoryApi.deleteCategory(id);
      console.log('Category deleted');
      
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting category:', error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    console.log('Getting category by id:', id);
    try {
      const category = await categoryApi.getCategoryById(id);
      console.log('Category fetched:', category);
      return category;
    } catch (error) {
      console.error('Error getting category:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Get tasks for specific category
  getCategoryTasks: async (id) => {
    console.log('Getting tasks for category id:', id);
    try {
      const tasks = await categoryApi.getCategoryTasks(id);
      console.log('Category tasks fetched:', tasks);
      return tasks;
    } catch (error) {
      console.error('Error getting category tasks:', error);
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useTaskStore;