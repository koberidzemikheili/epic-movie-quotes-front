<template>
  <div class="relative">
    <div
      class="flex items-center bg-zinc-950 shadow-lg rounded-lg p-4 mt-4"
      @click="handleClickOutside"
    >
      <img
        class="w-20 h-20 object-cover rounded-lg mr-4"
        :src="backendurl + '/storage/' + quote.quote_image"
        :alt="quote.title"
      />
      <div class="text-white">{{ quote.title.en }}</div>
    </div>
    <div class="absolute top-4 right-2 mt-2">
      <button @click="showOptions = !showOptions">
        <IconThreeDot />
      </button>
      <div
        v-if="showOptions"
        class="bg-gray-800 shadow-md rounded-lg p-6 mt-6 text-white absolute top-0 right-0 z-10"
        style="width: 200px"
      >
        <div>
          <button class="flex items-center" @click="handleViewQuote">
            <div class="mr-1"><IconEye /></div>
            View Quote
          </button>
        </div>
        <div class="mt-4" v-if="canEditQuote">
          <button class="flex items-center" @click="handleEditQuote">
            <div class="mr-1"><IconPencil /></div>
            Edit Quote
          </button>
        </div>
        <div class="mt-4" v-if="canDeleteQuote">
          <button class="flex items-center" @click="handleDeleteQuote">
            <div class="mr-1"><IconTrashCan /></div>
            Delete Quote
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import IconThreeDot from "@/components/icons/IconThreeDots.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});

const showOptions = ref(false);

const canEditQuote = userStore.userData.id === props.quote.user_id;
const canDeleteQuote = userStore.userData.id === props.quote.user_id;

const handleViewQuote = () => {
  console.log("View Quote Modal");
};

const handleEditQuote = () => {
  console.log("View Edit Modal");
};

const handleDeleteQuote = () => {
  console.log("View Delete Modal");
};

const handleClickOutside = () => {
  showOptions.value = false;
};
</script>
