<template>
  <TheModal addclass="md:h-2/5">
    <IconThankYou />
    <div class="text-3xl text-white mt-5">Check your email</div>
    <div class="text-white mt-5 text-center">
      We have sent a password recover instructions to your email
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/Modals/TheModal.vue";
import IconThankYou from "@/components/icons/IconThankYou.vue";
</script>
