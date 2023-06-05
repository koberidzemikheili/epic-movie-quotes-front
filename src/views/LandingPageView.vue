<template>
  <div :class="['h-screen', 'w-screen', overflow]">
    <router-view />
    <div class="lg:mx-12 mx-5 mb-5 relative">
      <div class="text-orange-200 inline-flex">MOVIE QUOTES</div>
      <button
        @click="openModal('LoginPage')"
        class="text-white bg-transparent py-1 px-4 border mx-2 rounded float-right"
      >
        Log In
      </button>
      <button
        @click="openModal('RegisterPage')"
        class="text-white bg-red-600 py-1 px-4 rounded float-right"
      >
        Sign Up
      </button>
    </div>
    <div class="flex flex-col items-center justify-center h-2/3">
      <div
        class="flex flex-col text-orange-200 lg:text-5xl text-3xl font-bold items-center"
      >
        <div>Find any quote in</div>
        <div>millions of movie lines</div>
      </div>
      <button class="text-white text-xl mt-5 bg-red-600 py-4 px-2 rounded">
        Get started
      </button>
    </div>
    <div class="w-screen h-screen">
      <img
        class="h-full w-full object-cover object-center top:2"
        src="@/assets/image-1.png"
      />
      <div class="text-white text-4xl relative">
        - "You have to leave something behind to go forward"
      </div>
    </div>
    <div class="w-screen h-screen">
      <img
        class="h-full w-full object-cover object-center"
        src="@/assets/image-2.png"
      />
    </div>
    <div class="w-screen h-screen">
      <img
        class="h-full w-full object-cover object-center"
        src="@/assets/image-3.png"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
const overflow = ref("");
const openModal = (pagename) => {
  router.push({ name: pagename });
};
watchEffect(() => {
  route.name === "LandingPage"
    ? (overflow.value = "")
    : (overflow.value = "overflow-hidden");
});
</script>
