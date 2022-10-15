<template>
  <button class="default">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
  },
  name: 'my-button'
};
</script>

<style scoped>
.default {
  padding: 10px;
  border: 1px solid green;
  background-color: transparent;
}
</style>
