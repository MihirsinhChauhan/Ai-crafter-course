import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  categories: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    console.log('Fetching tasks...');
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const currentTasks = useTaskStore.getState().tasks;
    console.log('Fetched tasks:', currentTasks);
    set({ tasks: currentTasks, loading: false });
  },
  addTask: async (task) => {
    console.log('Adding task:', task);
    set((state) => {
      const newTask = {
        ...task,
        id: Date.now(),
        isComplete: false,
      };
      const updatedTasks = [...state.tasks, newTask];
      console.log('Tasks after adding:', updatedTasks);
      return { tasks: updatedTasks, loading: false };
    });
  },
  updateTask: async (id, updatedTask) => {
    console.log('Updating task with id:', id, 'Data:', updatedTask);
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      console.log('Tasks after updating:', updatedTasks);
      return { tasks: updatedTasks, loading: false };
    });
  },
  deleteTask: async (id) => {
    console.log('Deleting task with id:', id);
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      console.log('Tasks after deleting:', updatedTasks);
      return { tasks: updatedTasks, loading: false };
    });
  },
  addCategory: async (category) => {
    console.log('Adding category:', category);
    set((state) => {
      const newCategory = {
        ...category,
        id: Date.now(),
      };
      const updatedCategories = [...state.categories, newCategory];
      console.log('Categories after adding:', updatedCategories);
      return { categories: updatedCategories, loading: false };
    });
  },
  updateCategory: async (id, updatedCategory) => {
    console.log('Updating category with id:', id, 'Data:', updatedCategory);
    set((state) => {
      const updatedCategories = state.categories.map((cat) =>
        cat.id === id ? { ...cat, ...updatedCategory } : cat
      );
      console.log('Categories after updating:', updatedCategories);
      return { categories: updatedCategories, loading: false };
    });
  },
  deleteCategory: async (id) => {
    console.log('Deleting category with id:', id);
    set((state) => {
      const updatedCategories = state.categories.filter((cat) => cat.id !== id);
      console.log('Categories after deleting:', updatedCategories);
      return { categories: updatedCategories, loading: false };
    });
  },
}));

export default useTaskStore;