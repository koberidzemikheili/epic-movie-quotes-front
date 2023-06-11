<template>
  <div class="h-screen w-screen">
    <!--The header for both screens-->
    <div class="p-5 bg-gray-800 flex justify-between items-center">
      <div class="flex items-center">
        <button
          @click="showMenu = !showMenu"
          class="text-white bg-transparent py-1 px-4 border mx-2 rounded sm:hidden"
        >
          <IconMenu />
        </button>
        <div class="text-orange-200">MOVIE QUOTES</div>
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
    <!--Sidebar menu for mobile-->
    <div class="absolute w-full h-screen bg-gray-800" v-show="showMenu">
      <!-- User avatar and name -->
      <div class="flex items-center p-5">
        <div class="w-10 h-10 rounded-full bg-gray-400"></div>
        <div class="ml-3 text-orange-200">
          {{ userData.username || "Loading..." }}
        </div>
      </div>
      <!-- Movies page button -->
      <button class="text-white flex mt-5 p-5">
        <IconHouse class="mr-5" /> News Feed
      </button>
      <button class="text-white flex mt-5 p-5">
        <IconCamera class="mr-5" /> Movie List
      </button>
      <!-- Log Out button and Language Select for small screens-->
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
    <!--Main content-->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-1/4 m-10 sm:block hidden">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gray-400"></div>
          <div class="ml-3 text-orange-200">
            {{ userData.username || "Loading..." }}
          </div>
        </div>
        <button class="text-white flex mt-5">
          <IconHouse class="mr-5" /> News Feed
        </button>
        <button class="text-white flex mt-5">
          <IconCamera class="mr-5" /> Movie List
        </button>
      </div>
      <div class="w-full sm:w-3/4 mr-10 mt-10">
        <slot></slot>
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

const showMenu = ref(false);
const userData = ref({});

const LogOut = () => {
  instance.post("api/logout").then(() => {});
};

onMounted(() => {
  instance.get("api/user").then((response) => {
    userData.value = response.data;
    console.log(response.data);
  });
});
</script>
