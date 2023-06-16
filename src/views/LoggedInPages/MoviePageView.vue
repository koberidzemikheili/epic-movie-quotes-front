<template>
  <TheMainPage>
    <div class="w-full bg-gray-500">
      <!-- Posts -->
      <!-- Add your posts content here -->
      <button @click="openModal('AddMovie')">add movies</button>
      <router-view />
    </div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import router from "@/router";
const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
