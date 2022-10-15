<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-button @click="fetchPosts">Загрузить посты</my-button>
    <my-button @click="clearList">Очистить посты</my-button>
    <my-modal v-model:show="isModalShow" @update="hideModal">
      <PostForm @create="createPost" />
    </my-modal>
    <PostList
      v-if="status === 'loaded'"
      :posts="sortedAndSearchedPost"
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
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      posts: [],
      isModalShow: false,
      selectedSort: "",
      searchQuery: "",
      // page: 1,
      limit: 2,
      totalPages: 0,
      status: "loading",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.isModalShow = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.isModalShow = true;
    },
    hideModal() {
      this.isModalShow = false;
    },
    clearList() {
      this.posts = [];
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      this.status = "loading";
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert("Error");
      } finally {
        this.status = "loaded";
      }
    },
        async loadMorePosts() {
      this.status = "loading";
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts =[...this.posts ,...response.data];
      } catch (error) {
        alert("Error");
      } finally {
        this.status = "loaded";
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedAndSearchedPost() {
      return [...this.posts].filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[newValue]);
      });
    },
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
