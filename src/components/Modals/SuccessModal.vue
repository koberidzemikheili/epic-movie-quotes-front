<template>
  <transition name="modal">
    <div
      class="fixed z-10 inset-0 overflow-y-auto flex h-16 md:w-1/3 w-5/6 justify-center mx-auto mt-32"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="isOpen"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div
        class="bg-white rounded shadow-lg w-full border-b flex items-center justify-between"
      >
        <IconSuccessSecond class="mx-4" />
        <div class="text-green-700 whitespace-nowrap">
          <slot></slot>
        </div>
        <div @click="close">
          <IconCloseSuccess />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import IconSuccessSecond from "@/components/icons/IconSuccessSecond.vue";
import IconCloseSuccess from "@/components/icons/IconCloseSuccess.vue";

defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["update:isOpen"]);

const close = () => {
  emit("update:isOpen", false);
};
</script>
