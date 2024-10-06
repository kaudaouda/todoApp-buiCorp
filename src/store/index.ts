import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [],
    filter: 'all',
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    loadTasks({ commit }) {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        commit('setTasks', JSON.parse(tasks));
      }
    },
    saveTasks({ state }) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
  getters: {
    filteredTasks: (state) => {
      if (state.filter === 'completed') {
        return state.tasks.filter(task => task.completed);
      } else if (state.filter === 'incomplete') {
        return state.tasks.filter(task => !task.completed);
      }
      return state.tasks;
    },
    remainingTasksCount: (state) => {
      return state.tasks.filter(task => !task.completed).length;
    },
  },
});
