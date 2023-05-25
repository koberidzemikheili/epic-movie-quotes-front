<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <div class="bg-gray-900 p-6" @click.stop>
      <div class="w-full">
        <div class="flex flex-col m-16 justify-center items-center">
          <div class="text-2xl text-white">Create an account</div>
          <div class="text-gray-500">start your journey !</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
const closeModal = () => {
  router.push({ name: "LandingPage" });
};
</script>
