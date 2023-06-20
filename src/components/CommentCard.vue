<template>
  <div class="p-2 rounded mb-2" v-if="commentuser">
    <div class="flex items-center font-bold">
      <img
        class="w-10 h-10 rounded-full bg-gray-400"
        :src="backendurl + '/storage/' + commentuser.profile_pictures"
        alt="profile picture"
      />
      <div class="ml-2 text-white">
        {{ commentuser.username }}
      </div>
    </div>
  </div>
  <div class="ml-14 text-white">
    {{ comment.comment }}
  </div>
  <hr class="border border-gray-800 ml-14 mt-4" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import instance from "@/api/index.js";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const commentuser = ref();
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
onMounted(async () => {
  try {
    const response = await instance.get(`/api/user/${props.comment.user_id}`);
    commentuser.value = response.data.user;
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>
