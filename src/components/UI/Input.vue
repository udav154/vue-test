<template>
 <input :value="modelValue" @input="updateInput" class="input"  />
</template>

<script>
export default {
  name:'my-input',
  props : {
    modelValue: [ String, Number]
  },
  methods: {
    updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
    }
  },
}
</script>

<style>
.input {
  width: 100%;
  border: 1px solid green;
  margin-top: 10px;
  padding: 10px;
}

</style>