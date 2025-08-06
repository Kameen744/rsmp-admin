import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/table",
      name: "admin",
      component: AdminView,
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
