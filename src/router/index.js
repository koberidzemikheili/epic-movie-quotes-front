import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: () => import("@/views/LandingPageView.vue"),
      children: [
        {
          path: "/login-page",
          name: "LoginPage",
          component: () => import("@/views/LoginPageView.vue"),
        },
      ],
    },
  ],
});

export default router;
