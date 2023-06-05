<template>
  <TheModal addclass="md:h-2/5">
    <IconThankYou />
    <div class="text-3xl text-white mt-5">Thank You!</div>
    <div class="text-white mt-5 text-center">
      Your account has been activated.
    </div>
    <button
      @click="changeRoute"
      class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded w-full"
    >
      Sign in
    </button>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/TheModal.vue";
import IconThankYou from "@/components/icons/IconThankYou.vue";
import router from "@/router";
const changeRoute = () => {
  router.push({ name: "LoginPage" });
};
</script>
