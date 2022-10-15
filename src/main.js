import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";


const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach(el=> app.directive(el.name, el))

app.use(store).use(router).mount("#app");
