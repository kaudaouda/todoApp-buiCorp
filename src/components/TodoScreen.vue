<template lang="pug">
.todoScreen.w-full
  .bg-red-100.p-8.flex.flex-col.items-center
    .w-full.bg-white.shadow-lg.rounded-lg.p-8
      h1.text-3xl.font-bold.text-gray-800.mb-8.text-center My Todo List
      .flex.mb-6.space-x-2
        input.flex-1.p-3.border.rounded-lg(v-model='newTask' type='text' placeholder='Ajouter une nouvelle tâche...' class='focus:outline-none focus:ring-2 focus:ring-indigo-500')
        button.bg-indigo-500.text-white.px-6.py-3.rounded-lg.transition-colors(@click='addTask' class='hover:bg-indigo-600')
          | Add
      .flex.justify-around.mb-8
        button.transition-colors(@click="filterTasks('all')" :class="filter === 'all' ? 'text-indigo-500' : 'text-gray-500'" class='hover:text-indigo-500')
          | All
        button.transition-colors(@click="filterTasks('completed')" :class="filter === 'completed' ? 'text-indigo-500' : 'text-gray-500'" class='hover:text-indigo-500')
          | Done
        button.transition-colors(@click="filterTasks('incomplete')" :class="filter === 'incomplete' ? 'text-indigo-500' : 'text-gray-500'" class='hover:text-indigo-500')
          | incomplete
      ul
        li.flex.justify-between.items-center.bg-gray-50.p-4.rounded-lg.mb-4.shadow-sm(v-for='task in filteredTasks' :key='task.id')
          .flex.items-center
            input.form-checkbox.h-5.w-5.text-indigo-500.transition.duration-150.ease-in-out(type='checkbox' v-model='task.completed')
            span.ml-3.text-lg(:class="{'line-through text-gray-500': task.completed, 'text-gray-800': !task.completed}")
              | {{ task.title }}
          button.text-red-500.transition-colors(@click='deleteTask(task.id)' class='hover:text-red-600')
            | Delete
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: '',
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
            completed: false
          });
          this.newTask = '';
        }
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      filterTasks(type) {
        this.filter = type;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Aucun style supplémentaire, simplicité totale */
  </style>
  