import { getUserData } from "@/api/apiService.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
    isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  }),

  actions: {
    async fetchUserData() {
      const response = await getUserData();
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
