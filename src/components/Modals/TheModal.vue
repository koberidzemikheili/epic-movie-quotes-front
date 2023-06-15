<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <div
      :class="[
        'bg-gray-900',
        'p-6',
        'md:w-1/3',
        'w-screen',
        'h-screen',
        'rounded-md',
        'md:h-1/2',
        addclass,
      ]"
      @click.stop
    >
      <div class="w-full">
        <div class="flex flex-col md:m-12 mt-16 justify-center items-center">
          <slot></slot>
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
defineProps({
  addclass: { type: String, required: false },
});
</script>
