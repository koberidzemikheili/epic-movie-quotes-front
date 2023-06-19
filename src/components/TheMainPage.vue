<template>
  <div class="min-h-screen w-screen">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="p-5 bg-gray-800 flex justify-between items-center">
        <div class="flex items-center">
          <button
            @click="showMenu = !showMenu"
            class="text-white bg-transparent py-1 px-4 border mx-2 rounded sm:hidden"
          >
            <IconMenu />
          </button>
          <div class="text-orange-200 md:block hidden">MOVIE QUOTES</div>
        </div>
        <div class="flex items-center">
          <TheNotifications></TheNotifications>
          <LanguageSelect class="sm:block hidden"></LanguageSelect>
          <button
            @click="LogOut"
            class="text-white bg-transparent py-1 px-4 border mx-2 rounded sm:block hidden"
          >
            Log Out
          </button>
        </div>
      </div>
      <div class="absolute w-full bg-gray-800" v-show="showMenu">
        <div class="flex items-center p-5">
          <img
            class="w-10 h-10 rounded-full bg-gray-400"
            :src="
              backendurl + '/storage/' + userStore.userData.profile_pictures
            "
            alt="profile picture"
          />
          <div class="ml-3 text-orange-200">
            {{ userStore.userData.username }}
          </div>
        </div>
        <button class="text-white flex mt-5 p-5">
          <IconHouse class="mr-5" /> News Feed
        </button>
        <button class="text-white flex mt-5 p-5">
          <IconCamera class="mr-5" /> Movie List
        </button>
        <div class="flex items-center p-5 sm:hidden block">
          <button
            @click="LogOut"
            class="text-white bg-transparent py-1 px-4 border mx-2 rounded"
          >
            Log Out
          </button>
          <LanguageSelect />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row mx-8 lg:mx-0">
        <div class="w-full sm:w-1/4 m-10 sm:block hidden">
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full bg-gray-400"
              :src="
                backendurl + '/storage/' + userStore.userData.profile_pictures
              "
              alt="profile picture"
            />
            <div class="ml-3 text-orange-200">
              {{ userStore.userData.username }}
            </div>
          </div>
          <button class="text-white flex mt-5">
            <IconHouse class="mr-5" /> News Feed
          </button>
          <button class="text-white flex mt-5">
            <IconCamera class="mr-5" /> Movie List
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
import IconCamera from "@/components/icons/IconCamera.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import { ref, onMounted } from "vue";
import instance from "@/api/index.js";
import LanguageSelect from "@/components/LanguageSelect.vue";
import TheNotifications from "@/components/TheNotifications.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const showMenu = ref(false);
let isLoading = ref(true);

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
});
</script>
