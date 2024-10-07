<template lang="pug">
div(
  :class=`[
    'fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300',
    { 'opacity-0': !show, 'opacity-100': show }
  ]`
)
  | {{ message }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'Notification'
    }
  }
});
</script>
