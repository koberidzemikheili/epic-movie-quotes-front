<template>
  <TheModal addclass="md:h-2/5">
    <IconSuccess />
    <div class="text-3xl text-white mt-5">Success!</div>
    <div class="text-white mt-5 text-center">
      Your Password changed successfully
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "@/components/Modals/TheModal.vue";
import IconSuccess from "@/components/icons/IconSuccess.vue";
</script>
