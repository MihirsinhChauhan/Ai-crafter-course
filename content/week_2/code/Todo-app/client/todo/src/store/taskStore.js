import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
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
  editTask: async (id, updatedTask) => {
    console.log('Editing task with id:', id, 'Updated data:', updatedTask);
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      console.log('Tasks after editing:', updatedTasks);
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
}));

export default useTaskStore;