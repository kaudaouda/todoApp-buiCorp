<template lang="pug">
.filter-container.flex.space-x-5.items-center
  .flex.space-x-3.mb-8.items-center
    p.text-lg.font-regular.text-gray-400 Filtrer
    button.bg-gray-400.p-2.rounded-lg.transition-colors(
      v-for="filterOption in filterOptions"
      :key="filterOption.value"
      @click="setFilter(filterOption.value, $event)"
      :class="{ 'text-white font-bold bg-black': filter === filterOption.value, 'text-white': filter !== filterOption.value }"
      class="hover:text-orange-400 text-xl"
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
