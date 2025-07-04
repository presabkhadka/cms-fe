import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import Content from "../views/Content.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "login", component: Login },
    { path: "/home", name: "home", component: Home },
    { path: "/users", name: "user", component: Users },
    { path: "/contents", name: "contents", component: Content },
  ],
});

export default router;
