<template>
  <transition name="modal">
    <div
      class="fixed z-10 inset-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="isOpen"
    >
      <div class="flex h-5/6 bg-searchmodalbg flex-col">
        <div class="flex mt-4 ml-4">
          <IconSmallArrowLeft @click="close" class="cursor-pointer" />
          <input
            v-model="searchTerm"
            :placeholder="$t('newsfeed.buttons.search1')"
            class="bg-transparent w-full mr-2 ml-2 text-white placeholder:text-white"
            @keyup.enter="save"
          />
        </div>
        <hr class="border border-x border-gray-600 mt-4" />
        <div class="text-gray-400 mt-4 ml-12">
          {{ $t("newsfeed.labels.searchtext1") }}
        </div>
        <div class="text-gray-400 mt-4 ml-12">
          {{ $t("newsfeed.labels.searchtext2") }}
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from "vue";
import IconSmallArrowLeft from "@/components/icons/IconSmallArrowLeft.vue";
let searchTerm = ref("");
defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["update:isOpen"], ["mobile-search"]);

const close = () => {
  emit("update:isOpen", false);
};
const save = () => {
  emit("mobile-search", searchTerm.value);
  emit("update:isOpen", false);
};
</script>
