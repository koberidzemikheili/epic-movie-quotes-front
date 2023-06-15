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
import instance from "@/api/index.js";
import LanguageSelect from "@/components/LanguageSelect.vue";

const LogOut = () => {
  instance.post("api/logout").then(() => {});
};
</script>
