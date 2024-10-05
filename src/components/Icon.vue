<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="path" />
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
  },
};
</script>
