<template>
  <div class="app">
    <h1>Страница использующая стор</h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <my-button @click="fetchPosts">Загрузить посты</my-button>
    <my-button @click="clearList">Очистить посты</my-button>
    <my-modal v-model:show="isModalShow" @update="hideModal">
      <PostForm @create="createPost" />
    </my-modal>
    <PostList
      v-if="status === 'loaded'"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div style="margin: 20px auto; text-align: center" v-else>
      Идет загрузка...
    </div>

    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="page"
        class="page"
        :class="{ current_page: page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      isModalShow: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setPosts: "post/setPosts",
      setSearchQuery:"post/setSearchQuery",
      setSelectedSort:"post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      this.setPosts([...this.posts, post ])
      this.isModalShow = false;
    },
    removePost(post) {
    this.setPosts(this.posts.filter((p) => p.id !== post.id))
    },
    showDialog() {
      this.isModalShow = true;
    },
    hideModal() {
      this.isModalShow = false;
    },
    clearList() {
      this.setPosts([])
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      status: (state) => state.post.status,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

/* .page {
  padding: 3px 5px;
  border: 1px solid transparent;
  cursor: pointer;
}
.page:hover {
border: 1px solid black;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.current_page {
  border: 2px solid green !important;
} */
</style>
