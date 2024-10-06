<template lang="pug">
.todoScreen.w-full
  .bg-red-100.p-8.flex.flex-col.items-center
    .w-full.bg-white.shadow-lg.rounded-lg.p-8
      h1.text-3xl.font-bold.text-gray-800.mb-8.text-center My Todo App
      .flex.mb-6.space-x-2
        input.flex-1.p-3.border.rounded-lg(
          v-model='newTask' 
          type='text' 
          placeholder='Ajouter une nouvelle tâche...' 
          class='focus:outline-none focus:ring-2 focus:ring-orange-500' @keyup.enter='addNewTask'
        )
        button.bg-orange-500.text-white.px-6.py-3.rounded-lg.transition-colors.flex.items-center.justify-center.font-bold(@click='addNewTask' class='hover:bg-orange-300' aria-label='Ajouter une tâche')
          icon(:path='mdiPlusCircleOutline' size='36' class='text-white') 
          | Ajouter
      .error-container.w-full.flex.justify-center.items-center.my-5(v-if="!newTask.trim() && showError")
        icon(:path='mdiAlertCircleOutline' size='36' class='text-red-500')
        p.text-red-500 Le nom de la tâche ne peut pas être vide.
      .filter-container.flex.space-x-5.items-center
        .flex.space-x-3.mb-8.items-center
          p.text-lg.font-regular.text-gray-400 Filtrer
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="setFilter('all')" :class="filter === 'all' ? 'text-white font-bold bg-black' : 'text-white'" class='hover:text-orange-400 text-xl')
            | Toutes les tâches
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="setFilter('completed')" :class="filter === 'completed' ? 'text-white font-bold bg-black' : 'text-white'" class='hover:text-orange-400 text-xl')
            | Tâches terminées
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="setFilter('incomplete')" :class="filter === 'incomplete' ? 'text-white font-bold bg-black' : 'text-white'" class='hover:text-orange-400 text-xl')
            | Tâches incomplètes

      // Utilisation de transition-group avec les animations de suppression
      transition-group(name="task" tag="ul")
        li.flex.justify-between.items-center.bg-gray-50.p-4.rounded-lg.mb-4.shadow-sm(v-for='task in filteredTasks' :key='task.id' :class="{ 'fade-enter-active': task.completed }")
          .flex.items-center
            input.form-checkbox.h-5.w-5.text-indigo-500.transition.duration-150.ease-in-out(type='checkbox' v-model='task.completed' @change='saveTasks')
            span.ml-3.text-lg(v-if='!task.isEditing' :class="{'line-through text-gray-500': task.completed, 'text-gray-800': !task.completed}")
              | {{ task.title }}
            input.ml-3.text-lg.p-2.rounded-lg(v-else v-model='task.title' @keyup.enter='saveTask(task)' class='focus:outline-none focus:ring-2 focus:ring-orange-500')
          .flex.space-x-3
            button.text-gray-400.transition-colors(@click='editTask(task)' v-if='!task.isEditing')
              icon(:path='mdiPencil' size='36' class='text-gray-500')
            button.bg-orange-500.text-white.px-4.py-2.rounded-lg(@click='saveTask(task)' v-if='task.isEditing' class='hover:bg-orange-300')
              | Sauvegarder
            button.text-red-500.transition-colors(@click='removeTask(task.id)' class='hover:text-red-600')
              icon(:path='mdiDelete' size='36' class='text-red-500')

      p.text-lg.font-bold.mt-4.text-gray-400
        | Il ne reste {{ remainingTasksCount }} tâche(s) à compléter.


</template>
  
<script lang="ts">
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mdiPlusCircleOutline, mdiFilterOutline, mdiDelete, mdiPencil, mdiAlertCircleOutline } from '@mdi/js';

export default {
  data() {
    return {
      newTask: '',
      showError: false,
      mdiPlusCircleOutline,
      mdiFilterOutline,
      mdiDelete,
      mdiPencil,
      mdiAlertCircleOutline,
    };
  },
  computed: {
    ...mapState(['filter']),
    ...mapGetters(['filteredTasks', 'remainingTasksCount']),
  },
  methods: {
    ...mapMutations(['addTask', 'deleteTask', 'updateTask', 'setFilter']),
    ...mapActions(['loadTasks', 'saveTasks']),
    addNewTask() {
      if (this.newTask.trim()) {
        const newTask = {
          id: Date.now(),
          title: this.newTask,
          completed: false,
          isEditing: false
        };
        this.addTask(newTask);
        this.saveTasks();
        this.newTask = '';
        this.showError = false;
      } else {
        this.showError = true;
      }
    },
    removeTask(id) {
      this.deleteTask(id);
      this.saveTasks();
    },
    editTask(task) {
      this.updateTask({ ...task, isEditing: true });
    },
    saveTask(task) {
      this.updateTask({ ...task, isEditing: false });
      this.saveTasks();
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
