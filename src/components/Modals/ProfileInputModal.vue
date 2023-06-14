<template>
  <transition name="modal">
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="isOpen"
    >
      <div class="flex items-center h-5/6 mt-32 bg-slate-900 flex-col pb-64">
        <div
          class="bg-gray-950 rounded-lg text-left overflow-hidden transform transition-all my-8 align-middle w-full py-16"
        >
          <div class="mx-6">
            <slot></slot>
          </div>
        </div>
        <div class="w-full">
          <button
            class="text-white py-1 px-2 rounded mx-1 float-left ml-4"
            @click.prevent="close"
          >
            Cancel
          </button>
          <button
            class="bg-red-600 text-white py-1 px-4 rounded mx-1 float-right mr-4"
            @click.prevent="edit"
          >
            Edit
          </button>
        </div>
      </div>
      <ConfirmEditModal v-model:isOpen="isModalOpen" @save-field="save">
      </ConfirmEditModal>
    </div>
  </transition>
</template>
<script setup>
import { ref } from "vue";
import ConfirmEditModal from "@/components/Modals/ConfirmEditModal.vue";
defineProps({
  isOpen: Boolean,
});
let isModalOpen = ref(false);
const emit = defineEmits(["update:isOpen"], ["save-field"]);

const close = () => {
  emit("update:isOpen", false);
};
const save = () => {
  emit("save-field");
};
const edit = () => {
  isModalOpen.value = true;
};
</script>
