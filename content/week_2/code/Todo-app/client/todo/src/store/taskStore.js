import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    console.log('Fetching tasks...');
    set({ loading: true });
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const currentTasks = useTaskStore.getState().tasks; // Get current tasks
    console.log('Fetched tasks:', currentTasks);
    set({ tasks: currentTasks, loading: false });
  },
  addTask: async (task) => {
    console.log('Adding task:', task);
    set((state) => {
      const newTask = {
        ...task,
        id: Date.now(), // Simple ID generation, replace with UUID or backend ID later
        isComplete: false,
      };
      const updatedTasks = [...state.tasks, newTask];
      console.log('Tasks after adding:', updatedTasks);
      return { tasks: updatedTasks, loading: false };
    });
  },
}));

export default useTaskStore;