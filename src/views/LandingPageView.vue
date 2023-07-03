<template>
  <div :class="['h-screen', 'w-screen', overflow, 'overflow-auto', 'relative']">
    <router-view class="z-10" />
    <div class="lg:mx-12 mx-2 mb-2 relative">
      <div class="text-orange-200 inline-flex">MOVIE QUOTES</div>
      <button
        @click="openModal('LoginPage')"
        class="text-white bg-transparent py-1 px-4 border mx-2 rounded float-right"
      >
        {{ $t("landing.buttons.sign_in") }}
      </button>
      <button
        @click="openModal('RegisterPage')"
        class="text-white bg-red-600 py-1 px-4 rounded float-right"
      >
        {{ $t("landing.buttons.sign_up") }}
      </button>
      <LanguageSelect class="md:block hidden"></LanguageSelect>
    </div>
    <div
      class="flex flex-col items-center justify-center h-4/5 sticky top-0 w-full"
    >
      <div
        class="flex flex-col text-orange-200 lg:text-5xl text-3xl font-bold items-center"
      >
        <div>Find any quote in</div>
        <div>millions of movie lines</div>
      </div>
      <button
        @click="openModal('RegisterPage')"
        class="text-white text-xl mt-5 bg-red-600 py-4 px-2 rounded"
      >
        {{ $t("landing.buttons.get_started") }}
      </button>
    </div>
    <div
      v-for="(image, index) in images"
      :key="index"
      class="w-screen h-screen sticky top-0"
    >
      <img class="h-full w-full object-cover object-center" :src="image.src" />
      <div
        class="absolute top-0 left-0 h-full w-full flex flex-col justify-center pl-20 font-bold"
      >
        <div class="text-white text-4xl">
          {{ image.quote }}
        </div>
        <div class="text-white text-3xl mt-4">
          {{ image.movie }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import LanguageSelect from "../components/LanguageSelect.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const route = useRoute();
const overflow = ref("");
const openModal = (pagename) => {
  router.push({ name: pagename });
};

const images = ref([
  {
    src: "src/assets/image-1.png",
    quote: '- "You have to leave something behind to go forward"',
    movie: "Interstellar, 2014",
  },
  {
    src: "src/assets/image-2.png",
    quote:
      '- "I think we`re just gonna have to be secretly in love with earch other and leave it that"',
    movie: "The Royal Tenenbaums, 2001",
  },
  {
    src: "src/assets/image-3.png",
    quote:
      '- "I think we’re just gonna have to be secretly in love with earch other and leave it that"',
    movie: "The Royal Tenenbaums, 2001",
  },
]);

watchEffect(() => {
  route.name === "LandingPage"
    ? (overflow.value = "")
    : (overflow.value = "overflow-hidden");
});

onMounted(async () => {
  try {
    const response = await instance.get("api/user");
    if (response.data.google_id) {
      userStore.login();
      router.push({ name: "NewsFeed" });
    }
  } catch (error) {}
});
</script>
