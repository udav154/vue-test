<template>
  <form @submit.prevent>
    <h4>Сoздание поста</h4>
    <my-input v-focus placeholder="Название" type="text" v-model="post.title" />
    <my-input placeholder="Описание" type="text" v-model="post.body" />
    <my-button class="btn--create" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      post: {
        body: "",
        title: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn--create {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid green;
  background-color: transparent;
}
</style>
