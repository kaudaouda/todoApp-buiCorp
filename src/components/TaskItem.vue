<template lang="pug">
li.flex.justify-between.items-center.bg-gray-50.p-4.rounded-lg.mb-4.shadow-sm(:class="{ 'fade-enter-active': task.completed }")
  .flex.items-center
    input.form-checkbox.h-5.w-5.text-indigo-500.transition.duration-150.ease-in-out(
      type='checkbox'
      v-model='task.completed'
      @change='updateTask'
    )
    span.ml-3.text-lg(
      v-if='!task.isEditing'
      :class="{'line-through text-gray-500': task.completed, 'text-gray-800': !task.completed}"
    ) {{ task.title }}
    input.ml-3.text-lg.p-2.rounded-lg(
      v-else
      v-model='task.title'
      @keyup.enter='saveTask'
      class='focus:outline-none focus:ring-2 focus:ring-orange-500'
    )
  .flex.space-x-3
    button.text-gray-400.transition-colors(
      @click='editTask'
      v-if='!task.isEditing'
    )
      icon(:path='mdiPencil' size='36' class='text-gray-500')
    button.bg-orange-500.text-white.px-4.py-2.rounded-lg(
      @click='saveTask'
      v-if='task.isEditing'
      class='hover:bg-orange-300'
    ) Sauvegarder
    button.text-red-500.transition-colors(
      @click='removeTask'
      class='hover:text-red-600'
    )
      icon(:path='mdiDelete' size='36' class='text-red-500')
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mdiPencil, mdiDelete } from '@mdi/js';

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mdiPencil,
      mdiDelete
    };
  },
  methods: {
    updateTask() {
      this.$emit('update-task', this.task);
    },
    editTask() {
      this.$emit('edit-task', this.task);
    },
    saveTask() {
      this.$emit('save-task', this.task);
    },
    removeTask() {
      this.$emit('remove-task', this.task.id);
    }
  }
});
</script>
