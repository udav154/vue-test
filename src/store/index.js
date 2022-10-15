import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    post: postModule,
  },
});
