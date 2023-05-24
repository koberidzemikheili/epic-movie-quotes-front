<template>
  <div class="w-screen h-screen">
    <img class="h-full w-full object-cover object-center" :src="src" />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>
