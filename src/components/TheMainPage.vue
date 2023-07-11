<template>
  <div class="min-h-screen w-screen">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="p-5 bg-navbargray flex justify-between items-center">
        <div class="flex items-center">
          <button
            @click="showMenu = !showMenu"
            class="text-white bg-transparent py-1 px-4 mx-2 rounded sm:hidden"
          >
            <IconMenu />
          </button>
          <div class="text-orange-200 md:block hidden">MOVIE QUOTES</div>
        </div>
        <div class="flex items-center">
          <TheNotifications
            :notifications="userStore.userData.user.notificationsReceived"
          >
          </TheNotifications>
          <LanguageSelect class="sm:block hidden"></LanguageSelect>
          <button
            @click="LogOut"
            class="text-white bg-transparent py-1 px-4 border mx-2 rounded sm:block hidden"
          >
            {{ $t("mainpage.buttons.logout") }}
          </button>
        </div>
      </div>
      <div class="absolute w-full bg-navbargray" v-show="showMenu">
        <div class="flex items-center p-3">
          <img
            class="w-10 h-10 rounded-full bg-gray-400"
            :src="
              backendurl +
              '/storage/' +
              userStore.userData.user.profile_pictures
            "
            alt="profile picture"
          />
          <div class="ml-3 text-orange-200 text-lg flex flex-col">
            {{ userStore.userData.user.username }}
            <button @click="OpenProfilePage" class="text-white text-sm">
              {{ $t("mainpage.buttons.editbutton") }}
            </button>
          </div>
        </div>
        <button
          @click="OpenNewsFeedPage"
          class="text-white flex p-3 flex items-center"
        >
          <div class="mr-5">
            <IconHouse v-if="route.name === 'NewsFeed'" />
            <IconHouseWhite v-else />
          </div>
          {{ $t("mainpage.buttons.newsfeed") }}
        </button>
        <button
          @click="OpenMoviePage"
          class="text-white flex p-3 flex items-center"
        >
          <div class="mr-5">
            <IconCamera v-if="route.name === 'MoviePage'" />
            <IconCameraWhite v-else />
          </div>
          {{ $t("mainpage.buttons.movielist") }}
        </button>
        <div class="flex items-center p-3 sm:hidden block">
          <button
            @click="LogOut"
            class="text-white bg-transparent py-1 px-4 border rounded"
          >
            {{ $t("mainpage.buttons.logout") }}
          </button>
        </div>
        <LanguageSelect class="float-left mb-2 mx-0 p-3" />
      </div>
      <div class="flex flex-col sm:flex-row lg:mx-0">
        <div class="w-full sm:w-1/4 m-10 sm:block hidden">
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full bg-gray-400"
              :src="
                backendurl +
                '/storage/' +
                userStore.userData.user.profile_pictures
              "
              alt="profile picture"
            />
            <div class="ml-3 text-orange-200 flex flex-col text-lg">
              {{ userStore.userData.user.username }}
              <button @click="OpenProfilePage" class="text-white text-sm">
                {{ $t("mainpage.buttons.editbutton") }}
              </button>
            </div>
          </div>
          <button
            @click="OpenNewsFeedPage"
            class="text-white flex mt-5 flex items-center"
          >
            <div class="mr-5">
              <IconHouse v-if="route.name === 'NewsFeed'" />
              <IconHouseWhite v-else />
            </div>
            {{ $t("mainpage.buttons.newsfeed") }}
          </button>
          <button
            @click="OpenMoviePage"
            class="text-white flex mt-5 flex items-center"
          >
            <div class="mr-5">
              <IconCamera v-if="route.name === 'MoviePage'" />
              <IconCameraWhite v-else />
            </div>
            {{ $t("mainpage.buttons.movielist") }}
          </button>
        </div>
        <div class="w-full sm:w-3/4 mr-10">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconHouse from "@/components/icons/IconHouse.vue";
import IconHouseWhite from "@/components/icons/IconHouseWhite.vue";
import IconCamera from "@/components/icons/IconCamera.vue";
import IconCameraWhite from "@/components/icons/IconCameraWhite.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import { ref, onMounted } from "vue";
import instance from "@/api/index.js";
import LanguageSelect from "@/components/LanguageSelect.vue";
import TheNotifications from "@/components/TheNotifications.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import instantiatePusher from "@/helpers/instantiatePusher.js";

let route = useRoute();
const userStore = useUserStore();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const showMenu = ref(false);
let isLoading = ref(true);
const pusherActive = ref(false);

const LogOut = () => {
  instance
    .post("api/logout")
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
onMounted(async () => {
  await userStore.fetchUserData();
  isLoading.value = false;

  pusherActive.value = instantiatePusher();
  await window.Echo.private(
    `notifications.${userStore.userData.user.id}`
  ).listen("NewNotification", () => {
    userStore.fetchUserData();
  });
});
const OpenProfilePage = () => {
  router.push({ name: "ProfilePage" });
};
const OpenNewsFeedPage = () => {
  router.push({ name: "NewsFeed" });
};
const OpenMoviePage = () => {
  router.push({ name: "MoviePage" });
};
</script>
