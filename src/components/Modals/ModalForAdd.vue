<template>
  <div
    class="fixed inset-0 flex items-center justify-center"
    @click="closeModal"
  >
    <div
      :class="[
        'bg-stone-950',
        'p-6',
        'md:w-1/3',
        'w-screen',
        'h-screen',
        'rounded-md',
        'md:h-1/2',
        'relative',
        addclass,
      ]"
      @click.stop
    >
      <div class="w-full">
        <div class="flex flex-col md:m-0 mt-2 justify-center items-center">
          <slot></slot>
        </div>
        <button
          class="absolute top-4 right-8 text-white text-2xl"
          @click="closeModal"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";

const closeModal = () => {
  router.go(-1);
};
defineProps({
  addclass: { type: String, required: false },
});
</script>
