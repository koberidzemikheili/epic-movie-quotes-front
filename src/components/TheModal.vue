<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="$emit('close-modal', closeModal)"
  >
    <div class="bg-white p-6" @click.stop>
      <router-view />
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
