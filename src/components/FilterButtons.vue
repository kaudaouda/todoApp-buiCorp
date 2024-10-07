<template lang="pug">
.filter-container(class="flex flex-col sm:flex-row sm:space-x-5 items-center")
  div(class="flex flex-col sm:flex-row sm:space-x-3 mb-8 items-center")
    p(class="text-lg font-regular text-gray-400 mb-3 sm:mb-0") Filtrer
    div(class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2")
      button(
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        @click="setFilter(filterOption.value, $event)"
        :class=`[
          'p-2 rounded-lg transition-colors hover:text-orange-400 text-xl',
          filter === filterOption.value ? 'text-white font-bold bg-black' : 'text-white bg-gray-400'
        ]`
      ) {{ filterOption.label }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FilterButtons',
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  emits: ['update:filter'],
  data() {
    return {
      filterOptions: [
        { value: 'all', label: 'Toutes les tâches' },
        { value: 'completed', label: 'Tâches terminées' },
        { value: 'incomplete', label: 'Tâches incomplètes' }
      ]
    };
  },
  methods: {
    setFilter(value: string, event: Event) {
      if (event && event.target) {
        // console.log('Event target:', event.target);
      }
      this.$emit('update:filter', value);
    }
  }
});
</script>
