<template>
  <transition name="modal">
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="isOpen"
    >
      <div class="flex items-center h-5/6 mt-32 bg-slate-900 flex-col">
        <div
          class="bg-gray-950 rounded-lg text-left overflow-hidden transform transition-all my-8 align-middle p-16 mx-4"
        >
          <div class="text-white w-full">
            {{ $t("profilepage.labels.suretomakechanges") }}
          </div>
          <br />
          <div class="w-full block">
            <button
              class="text-white py-1 px-2 rounded mx-1 float-left ml-4"
              @click.prevent="close"
            >
              {{ $t("profilepage.buttons.cancel") }}
            </button>
            <button
              class="bg-red-600 text-white py-1 px-4 rounded mx-1 float-right mr-4"
              @click.prevent="save"
            >
              {{ $t("profilepage.buttons.confirm") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["update:isOpen"], ["save-field"]);

const close = () => {
  emit("update:isOpen", false);
};
const save = () => {
  emit("save-field");
};
</script>
