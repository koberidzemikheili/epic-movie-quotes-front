<template>
  <div class="bg-zinc-950 rounded-xl p-4" v-if="postuser">
    <div class="flex items-center mb-4">
      <img
        class="w-10 h-10 rounded-full bg-gray-400"
        :src="backendurl + '/storage/' + postuser.profile_pictures"
        alt="profile picture"
      />
      <div class="ml-3 text-white">
        {{ postuser.username }}
      </div>
    </div>
    <div v-if="movie" class="mb-4">
      <div class="text-white flex items-center mb-2">
        <span
          >"{{ quote.title.en }}" movie-<span class="text-orange-200 mr-1">
            {{ movie.name.en }}</span
          >
          <span>({{ movie.year }})</span></span
        >
      </div>
      <img
        class="w-full h-auto"
        :src="backendurl + '/storage/' + quote.quote_image"
        alt="quote image"
      />
      <div class="flex items-center mt-2">
        <div class="flex items-center">
          <span class="text-white mr-2">{{ quote.comments.length }}</span>
          <IconChatSquare class="w-6" />
        </div>
        <div class="flex items-center ml-5">
          <span class="text-white mr-2">{{ quote.likes.length }}</span>
          <button @click="addLike"><IconLike class="w-6" /></button>
        </div>
      </div>
    </div>
    <hr class="border border-gray-800 w-full mb-4" />
    <div>
      <CommentCard
        v-for="comment in quote.comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div class="mt-4">
      <div class="flex items-center ml-2">
        <img
          class="w-10 h-10 rounded-full bg-gray-400"
          :src="backendurl + '/storage/' + userStore.userData.profile_pictures"
          alt="profile picture"
        />
        <input
          type="text"
          v-model="Commentvalue"
          placeholder="Write a Comment"
          @keyup.enter="savecomment"
          class="w-full py-2 px-4 rounded bg-gray-800 ml-2 text-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import IconChatSquare from "@/components/icons/IconChatSquare.vue";
import IconLike from "@/components/icons/IconLike.vue";
import CommentCard from "@/components/CommentCard.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const postuser = ref();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
let movie = ref();
let Commentvalue = ref();

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
});
let quote = ref({ ...props.quote });

const makeApiPostRequest = (endpoint, payload) => {
  return instance
    .post(endpoint, payload)
    .then((response) => {
      if (response.status === 201) {
        Commentvalue.value = "";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const savecomment = () => {
  const payload = {
    quote_id: props.quote.id,
    comment: Commentvalue.value,
  };
  makeApiPostRequest("/api/comment", payload);
};

const addLike = () => {
  const userLike = quote.value.likes.find(
    (like) => like.user_id === userStore.userData.id
  );

  if (userLike) {
    instance
      .delete(`/api/like/${userLike.id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Like removed successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    const payload = {
      quote_id: props.quote.id,
    };
    makeApiPostRequest("/api/like", payload).then(() => {
      console.log("Like added successfully");
    });
  }
};

onMounted(async () => {
  postuser.value = props.quote.user;
  movie.value = props.quote.movie;
});
</script>