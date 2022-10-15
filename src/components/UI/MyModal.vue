<template>
  <div class="dialog" v-if="show === true" @click.stop="hideModal">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: "my-modal",
  mixins:[toggleMixin],
  props: {
  },
 
};
</script>

<style scoped>

.dialog {
  top:0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  padding: 20px;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}

</style>
