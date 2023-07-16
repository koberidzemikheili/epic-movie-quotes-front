<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <img :src="frame" alt="gandolf" />
    <div class="text-3xl bolder text-white mt-6">Whoops!</div>
    <div class="text bolder text-white mt-4">
      We can't see the page you are looking for
    </div>
    <button @click="returnhome" class="text-white bg-red-600 py-2 px-4 mt-4">
      Return home
    </button>
  </div>
</template>
<script setup>
import frame from "@/assets/Frame.png";

const userStore = useUserStore();
import { useUserStore } from "@/stores/user.js";
import router from "@/router";
const returnhome = () => {
  if (userStore.isLoggedIn) {
    router.push({ name: "NewsFeed" });
  } else {
    router.push({ name: "LandingPage" });
  }
};
</script>
