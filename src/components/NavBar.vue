<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')" > Posts</my-button>
      <my-button @click="$router.push('/')" style="margin-left: 20px"> Main </my-button>
       <my-button @click="$router.push('/store')" style="margin-left: 20px"> Store </my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: gray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
