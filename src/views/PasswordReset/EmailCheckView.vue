<template>
  <TheModal addclass="md:h-2/5">
    <IconThankYou />
    <div class="text-3xl text-white mt-5">Check your email</div>
    <div class="text-white mt-5 text-center">
      We have sent a password recover instructions to your email
    </div>
    <a
      href="https://www.gmail.com"
      class="text-white mt-6 bg-red-600 py-2 px-2 rounded w-full text-center"
    >
      Go to my email
    </a>
    <button @click="close" class="flex items-center mt-6 mx-auto text-gray-500">
      Skip i'll confirm later
    </button>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/Modals/TheModal.vue";
import IconThankYou from "@/components/icons/IconThankYou.vue";
import router from "@/router";

const close = () => {
  router.push({ name: "LandingPage" });
};
</script>
