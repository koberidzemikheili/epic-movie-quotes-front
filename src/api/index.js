import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const landingPageRouteNames = [
  "LoginPage",
  "RegisterPage",
  "VerifiedSuccessfully",
  "VerifyAccount",
  "PasswordResetEmail",
  "NewPassword",
  "CheckEmail",
  "PasswordSuccess",
];

const instance = axios.create({
  baseURL: backendurl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use((config) => {
  const locale = localStorage.getItem("last-locale") || "en";
  config.headers["Accept-Language"] = locale;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore();
      if (!landingPageRouteNames.includes(router.currentRoute.value.name)) {
        userStore.logout();
        router.push({ name: "LandingPage" });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
