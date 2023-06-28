import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const locale = localStorage.getItem("last-locale") || "en";

const instance = axios.create({
  baseURL: backendurl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": locale,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore(); // Define userStore here
      userStore.logout();
      router.push({ name: "LoginPage" });
    }
    return Promise.reject(error);
  }
);

export default instance;
