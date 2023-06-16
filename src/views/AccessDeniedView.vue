<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <img :src="gandolf" alt="gandolf" />
    <div class="text-3xl bolder text-white mt-6">You shall not pass!</div>
    <div class="text bolder text-white mt-4">
      Sorry, but you don’t have permission to access this page
    </div>
    <button @click="returnhome" class="text-white bg-red-600 py-2 px-4 mt-4">
      Return home
    </button>
  </div>
</template>
<script setup>
import gandolf from "@/assets/Gandolf.png";

const userStore = useUserStore();
import { useUserStore } from "@/stores/user.js";
import router from "../router";
console.log(userStore.isLoggedIn);
const returnhome = () => {
  if (userStore.isLoggedIn) {
    router.push({ name: "NewsFeed" });
  } else {
    router.push({ name: "LandingPage" });
  }
};
</script>
