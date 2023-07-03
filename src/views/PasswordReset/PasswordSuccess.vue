<template>
  <TheModal addclass="md:h-2/5">
    <IconSuccess />
    <div class="text-3xl text-white mt-5">Success!</div>
    <div class="text-white mt-5 text-center">
      Your Password changed successfully
    </div>
    <button
      @click="gotologin"
      class="text-white mt-6 bg-red-600 py-2 px-2 rounded w-full text-center"
    >
      Log In
    </button>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/Modals/TheModal.vue";
import IconSuccess from "@/components/icons/IconSuccess.vue";
import router from "@/router";

const gotologin = () => {
  router.push({ name: "LoginPage" });
};
</script>
