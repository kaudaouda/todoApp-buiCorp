<template lang="pug">
.todoScreen.w-full.h-screen.flex.items-center.justify-center
  .max-w-4xl.w-full
    .w-full.bg-white.shadow-lg.rounded-lg.p-8
      h1.text-3xl.font-bold.text-gray-800.mb-8.text-center Todo App
      TaskInput(@add-task='addNewTask')
      .error-container.w-full.flex.justify-center.items-center.my-5(v-if="!newTask.trim() && showError")
        icon(:path='mdiAlertCircleOutline' size='36' class='text-red-500')
        p.text-red-500 Le nom de la tâche ne peut pas être vide.
      FilterButtons(:filter="filter" @update:filter="setFilter")
      // Utilisation de transition-group avec les animations de suppression
      transition-group(name="task" tag="ul")
        TaskItem(
          v-for='task in filteredTasks'
          :key='task.id'
          :task='task'
          @update-task='saveTasks'
          @edit-task='editTask'
          @save-task='saveTask'
          @remove-task='removeTask'
        )
      p.text-lg.font-bold.mt-4.text-gray-400
        | Il reste {{ remainingTasksCount }} tâche(s) à compléter.


</template>
  
<script lang="ts">
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mdiFilterOutline, mdiDelete, mdiPencil, mdiAlertCircleOutline } from '@mdi/js';
import TaskInput from './TaskInput.vue';
import FilterButtons from './FilterButtons.vue';
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskInput,
    FilterButtons,
    TaskItem
  },
  data() {
    return {
      newTask: '',
      showError: false,
      mdiFilterOutline,
      mdiDelete,
      mdiPencil,
      mdiAlertCircleOutline,
      currentFilter: 'all', // Valeur initiale du filtre
    };
  },
  computed: {
    ...mapState(['filter']),
    ...mapGetters(['filteredTasks', 'remainingTasksCount']),
  },
  methods: {
    ...mapMutations(['addTask', 'deleteTask', 'updateTask', 'setFilter']),
    ...mapActions(['loadTasks', 'saveTasks']),
    addNewTask(taskTitle) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
        isEditing: false
      };
      this.addTask(newTask);
      this.saveTasks();
      this.showError = false;
    },
    removeTask(id) {
      this.deleteTask(id);
      this.saveTasks();
    },
    editTask(task) {
      task.isEditing = true;
    },
    saveTask(task) {
      task.isEditing = false;
      this.saveTasks();
    },
    updateFilter(newFilter: string) {
      this.currentFilter = newFilter;
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks));
    },
    loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.$store.commit('setTasks', JSON.parse(savedTasks));
      }
    },
  },
  mounted() {
    this.loadTasks();
  }
};
</script>

<style scoped>
/* Transition pour l'ajout et la suppression des tâches */
.task-enter-active, .task-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.task-enter, .task-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation de transition pour le changement de statut (coché/décoché) */
.fade-enter-active {
  transition: background-color 0.3s ease, color 0.3s ease;
}
.task-completed {
  background-color: #f0f0f0;
  color: #999999;
}


</style>
