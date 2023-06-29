<template>
  <div class="relative">
    <div class="bg-zinc-950 shadow-lg rounded-lg p-4 mt-4">
      <div
        class="flex md:flex-row flex-col items-center w-full"
        @click="handleClickOutside"
      >
        <img
          class="w-44 h-32 object-cover rounded-lg mr-4"
          :src="backendurl + '/storage/' + quote.quote_image"
          :alt="quote.title"
        />
        <div class="text-white break-words md:w-2/3 w-full italic mt-2 md:mt-2">
          "{{ quote.title.en }}"
        </div>
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
          <div class="mt-4" v-if="canEditQuote">
            <button class="flex items-center" @click="handleDeleteQuote">
              <div class="mr-1"><IconTrashCan /></div>
              Delete Quote
            </button>
          </div>
        </div>
      </div>
      <hr class="border border-gray-800 mt-4 mb-4" />
      <div class="text-white flex items-center">
        {{ quote.comments.length }}<IconChatSquare class="w-6 mr-4 ml-1" />{{
          quote.likes.length
        }}<IconLike class="w-6 ml-1" />
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
import IconChatSquare from "@/components/icons/IconChatSquare.vue";
import IconLike from "@/components/icons/IconLike.vue";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["view-quote", "edit-quote", "delete-quote"]);
const showOptions = ref(false);

const canEditQuote = userStore.userData.user.id === props.quote.user_id;

const handleViewQuote = () => {
  emit("view-quote", props.quote.id);
  showOptions.value = false;
};

const handleEditQuote = () => {
  emit("edit-quote", props.quote.id);
  showOptions.value = false;
};

const handleDeleteQuote = () => {
  emit("delete-quote", props.quote.id);
  showOptions.value = false;
};

const handleClickOutside = () => {
  showOptions.value = false;
};
</script>
