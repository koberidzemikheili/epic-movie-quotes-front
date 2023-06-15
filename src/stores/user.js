import instance from "@/api/index.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: null,
  }),

  actions: {
    async fetchUserData() {
      const response = await instance.get("api/user");
      this.userData = response.data;
    },
  },
});
