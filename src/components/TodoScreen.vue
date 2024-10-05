<template lang="pug">
.todoScreen.w-full
  .bg-red-100.p-8.flex.flex-col.items-center
    .w-full.bg-white.shadow-lg.rounded-lg.p-8
      h1.text-3xl.font-bold.text-gray-800.mb-8.text-center My Todo List
      .flex.mb-6.space-x-2
        input.flex-1.p-3.border.rounded-lg(
          v-model='newTask' 
          type='text' 
          placeholder='Ajouter une nouvelle tâche...' 
          class='focus:outline-none focus:ring-2 focus:ring-orange-500'
        )
        button.bg-orange-500.text-white.px-6.py-3.rounded-lg.transition-colors.flex.items-center.justify-center.font-bold(@click='addTask' class='hover:bg-orange-300')
          icon(:path='mdiPlusCircleOutline' size='36' class='text-white') 
          | Ajouter
      .filter-container.flex.space-x-5.items-center
        .flex.space-x-3.mb-8.items-center
          p.text-lg.font-regular.text-gray-400 Filtrer
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="filterTasks('all')" :class="filter === 'all' ? 'text-white font-bold bg-black ' : 'text-white'" class='hover:text-orange-400 text-xl')
            | Toutes les tâches
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="filterTasks('completed')" :class="filter === 'completed' ? 'text-white font-bold bg-black ' : 'text-white'" class='hover:text-orange-400 text-xl ')
            | Tâches terminées
          button.bg-gray-400.p-2.rounded-lg.transition-colors(@click="filterTasks('incomplete')" :class="filter === 'incomplete' ? 'text-white font-bold bg-black ' : 'text-white'" class='hover:text-orange-400 text-xl ')
            | Tâches incomplètes
      ul
        li.flex.justify-between.items-center.bg-gray-50.p-4.rounded-lg.mb-4.shadow-sm(v-for='task in filteredTasks' :key='task.id')
          .flex.items-center
            input.form-checkbox.h-5.w-5.text-indigo-500.transition.duration-150.ease-in-out(type='checkbox' v-model='task.completed')
            
            // Affichage du titre ou du champ de modification
            span.ml-3.text-lg(v-if='!task.isEditing' :class="{'line-through text-gray-500': task.completed, 'text-gray-800': !task.completed}")
              | {{ task.title }}
            input.ml-3.text-lg.p-2(v-else v-model='task.title' @keyup.enter='saveTask(task)')

          .flex.space-x-3
            button.text-gray-400.transition-colors(@click='editTask(task)' v-if='!task.isEditing')
              icon(:path='mdiPencil' size='36' class='text-gray-500')
            button.bg-orange-500.text-white.px-4.py-2.rounded-lg(@click='saveTask(task)' v-if='task.isEditing' class='hover:bg-orange-300')
              | Sauvegarder
            button.text-red-500.transition-colors(@click='deleteTask(task.id)' class='hover:text-red-600')
              icon(:path='mdiDelete' size='36' class='text-red-500')
  </template>
    
  <script lang="ts">
  import { mdiPlusCircleOutline } from '@mdi/js'
  import { mdiFilterOutline } from '@mdi/js'
  import { mdiDelete } from '@mdi/js'
  import { mdiPencil } from '@mdi/js'
  export default {
    data() {
      return {
        newTask: '',
        mdiPlusCircleOutline,
        mdiFilterOutline,
        mdiDelete,
        mdiPencil,
        tasks: [],
        filter: 'all'
      };
    },
    computed: {
      filteredTasks() {
        if (this.filter === 'completed') {
          return this.tasks.filter(task => task.completed);
        } else if (this.filter === 'incomplete') {
          return this.tasks.filter(task => !task.completed);
        }
        return this.tasks;
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim()) {
          this.tasks.push({
            id: Date.now(),
            title: this.newTask,
            completed: false,
            isEditing: false // Ajoute un état pour savoir si une tâche est en mode édition
          });
          this.newTask = '';
        }
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      filterTasks(type) {
        this.filter = type;
      },
      editTask(task) {
        // Activer le mode édition pour cette tâche
        task.isEditing = true;
      },
      saveTask(task) {
        // Désactiver le mode édition après modification ou en appuyant sur Enter
        task.isEditing = false;
      }
    }
  }
  </script>
    
  <style scoped>
  /* Style minimaliste */
  </style>
  