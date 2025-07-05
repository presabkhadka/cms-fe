import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import Content from "../views/Content.vue";
import Comment from "../views/Comment.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "login", component: Login },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "user",
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: "/contents",
      name: "contents",
      component: Content,
      meta: { requiresAuth: true },
    },
    {
      path: "/comments",
      name: "comments",
      component: Comment,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("Authorization");
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
