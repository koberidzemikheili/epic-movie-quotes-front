<template>
  <div class="p-5 bg-gray-800">
    <div class="text-orange-200 inline-flex">MOVIE QUOTES</div>
    <button
      @click="LogOut"
      class="text-white bg-transparent py-1 px-4 border mx-2 rounded float-right"
    >
      Log Out
    </button>
    <LanguageSelect></LanguageSelect>
  </div>
</template>
<script setup>
import { logout } from "@/api/apiService.js";
import LanguageSelect from "@/components/LanguageSelect.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const LogOut = () => {
  logout()
    .then((response) => {
      if (response.status === 201) {
        userStore.logout();
        router.push({ name: "LandingPage" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
