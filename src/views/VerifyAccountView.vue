<template>
  <TheModal addclass="md:h-2/5">
    <IconThankYou />
    <div class="text-3xl text-white mt-5">Thank You!</div>
    <div class="text-white mt-5 text-center">
      Please check your email and follow the instructions to activate your
      account.
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/TheModal.vue";
import IconThankYou from "@/components/icons/IconThankYou.vue";
</script>
