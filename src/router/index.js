import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: () => import("@/views/LandingPageView.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.isLoggedIn) {
          next({ name: "AccessDenied" });
        } else {
          next();
        }
      },
      children: [
        {
          path: "/login-page",
          name: "LoginPage",
          component: () => import("@/views/LoginPageView.vue"),
        },
        {
          path: "/register-page",
          name: "RegisterPage",
          component: () => import("@/views/RegisterPageView.vue"),
        },
        {
          path: "/verified-successfully",
          name: "VerifiedSuccessfully",
          component: () => import("@/views/VerifiedSuccessfullyView.vue"),
        },
        {
          path: "/verify-account",
          name: "VerifyAccount",
          component: () => import("@/views/VerifyAccountView.vue"),
        },
        {
          path: "/password-reset-email",
          name: "PasswordResetEmail",
          component: () => import("@/views/PasswordReset/EmailInputView.vue"),
        },
        {
          path: "/new-password",
          name: "NewPassword",
          component: () => import("@/views/PasswordReset/NewPasswordView.vue"),
        },
        {
          path: "/check-email",
          name: "CheckEmail",
          component: () => import("@/views/PasswordReset/EmailCheckView.vue"),
        },
        {
          path: "/password-success",
          name: "PasswordSuccess",
          component: () => import("@/views/PasswordReset/PasswordSuccess.vue"),
        },
      ],
    },
    {
      path: "/news-feed",
      name: "NewsFeed",
      component: () => import("@/views/LoggedInPages/NewsFeedView.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (!userStore.isLoggedIn) {
          next({ name: "AccessDenied" });
        } else {
          next();
        }
      },
    },
    {
      path: "/movie-page",
      name: "MoviePage",
      component: () => import("@/views/LoggedInPages/MoviePageView.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (!userStore.isLoggedIn) {
          next({ name: "AccessDenied" });
        } else {
          next();
        }
      },
      children: [
        {
          path: "/add-movie",
          name: "AddMovie",
          component: () => import("@/views/LoggedInPages/AddMovieView.vue"),
        },
        {
          path: "/add-quote",
          name: "AddQuote",
          component: () => import("@/views/LoggedInPages/AddQuoteView.vue"),
        },
      ],
    },
    {
      path: "/profile-page",
      name: "ProfilePage",
      component: () => import("@/views/LoggedInPages/ProfilePageView.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (!userStore.isLoggedIn) {
          next({ name: "AccessDenied" });
        } else {
          next();
        }
      },
    },
    {
      path: "/access-denied",
      name: "AccessDenied",
      component: () => import("@/views/AccessDeniedView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
