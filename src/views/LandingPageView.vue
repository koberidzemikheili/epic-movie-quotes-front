<template class="bq">
  <div class="h-screen w-screen">
    <div class="my-5 lg:mx-12 mx-5 relative">
      <!-- <div v-if="showModal" class="modal">
        <div class="modal-content">
          <button @click="closeModal">Close</button>
          <router-view />
        </div>
      </div> -->

      <TheModal :show="showModal" @close-modal="closeModal">
        <router-view />
      </TheModal>
      <div class="text-orange-200 inline-flex">MOVIE QUOTES</div>
      <button
        @click="openModal('LoginPage')"
        class="text-white bg-transparent py-1 px-4 border mx-2 rounded float-right"
      >
        Log In
      </button>
      <button class="text-white bg-red-600 py-1 px-4 rounded float-right">
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
    <TheLandingBanner :src="image1" />
    <TheLandingBanner :src="image2" />
    <TheLandingBanner :src="image3" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import TheModal from "@/components/TheModal.vue";
import TheLandingBanner from "@/components/TheLandingBanner.vue";
import router from "@/router";
import image1 from "@/assets/image-1.svg";
import image2 from "@/assets/image-2.svg";
import image3 from "@/assets/image-3.svg";

const showModal = ref(false);
const openModal = (pagename) => {
  showModal.value = true;
  router.push({ name: pagename });
};
const closeModal = () => {
  showModal.value = false;
  router.push({ name: "LandingPage" });
};
</script>
