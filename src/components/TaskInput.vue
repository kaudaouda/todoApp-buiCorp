<template lang="pug">
.relative
  .flex.flex-col.mb-6.space-y-2(class="md:flex-row md:space-y-0 md:space-x-2")
    input.p-3.border.rounded-lg.w-full(
      v-model='taskInput' 
      type='text' 
      :placeholder='placeholder' 
      class='focus:outline-none focus:ring-2 focus:ring-orange-500'
      @keyup.enter='handleAddTask'
    )
    .flex.justify-center(class="md:justify-start")
      button.bg-orange-500.text-white.px-6.py-3.rounded-lg.transition-colors.flex.items-center.justify-center.font-bold(
        @click='handleAddTask'
        class='hover:bg-orange-300'
        :aria-label='buttonLabel'
        :class="{ 'animate-bounce': isAnimating }"
      )
        icon(:path='mdiPlusCircleOutline' size='36' class='text-white')
        | {{ buttonText }}
  
  PopupNotification(:show="showPopup" message="Tâche ajoutée avec succès !")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mdiPlusCircleOutline } from '@mdi/js';
import PopupNotification from './PopupNotification.vue';

export default defineComponent({
  components: {
    PopupNotification
  },
  props: {
    placeholder: {
      type: String,
      default: 'Ajouter une nouvelle tâche...'
    },
    buttonText: {
      type: String,
      default: 'Ajouter'
    },
    buttonLabel: {
      type: String,
      default: 'Ajouter une tâche'
    }
  },
  emits: ['add-task'],
  setup(props, { emit }) {
    const taskInput = ref('');
    const isAnimating = ref(false);
    const showPopup = ref(false);

    const handleAddTask = () => {
      if (taskInput.value.trim()) {
        emit('add-task', taskInput.value.trim());
        taskInput.value = '';
        
        isAnimating.value = true;
        setTimeout(() => {
          isAnimating.value = false;
        }, 1000);

        showPopup.value = true;
        setTimeout(() => {
          showPopup.value = false;
        }, 3000);
      }
    };

    return {
      taskInput,
      handleAddTask,
      mdiPlusCircleOutline,
      isAnimating,
      showPopup
    };
  }
});
</script>
