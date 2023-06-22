import instance from "@/api/index.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
    isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  }),

  actions: {
    async fetchUserData() {
      const response = await instance.get("api/user");
      this.userData = response.data;
    },
    login() {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});
