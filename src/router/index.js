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
  ],
});

export default router;
