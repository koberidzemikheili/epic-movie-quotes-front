<template>
  <TheMainPage>
    <div class="w-full lg:w-2/3 bg-gray-500">
      <button @click="openModal('AddQuote')">add quotes</button>
      <router-view />
    </div>
    <div class="w-full lg:w-1/3"></div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import router from "@/router";
const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
