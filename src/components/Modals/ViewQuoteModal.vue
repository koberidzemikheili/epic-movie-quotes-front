<template>
  <div class="fixed inset-0 flex items-center justify-center z-9" v-if="quote">
    <div
      class="bg-stone-950 p-6 md:w-1/3 w-screen h-screen md:h-5/6 flex flex-col"
    >
      <div class="flex items-center justify-between">
        <div class="flex rounded-md" v-if="canEditQuote">
          <button @click="handleEditQuote" class="text-white rounded mr-4">
            <IconPencil />
          </button>
          <div class="w-px bg-gray-500 h-6"></div>
          <button @click="handleDeleteQuote" class="text-white rounded ml-4">
            <IconTrashCan />
          </button>
        </div>
        <div class="text-xl text-white">View Quote</div>
        <button class="text-white text-2xl ml-12" @click="closeThisModal">
          &times;
        </button>
      </div>
      <hr class="mt-4 mb-4 border border-gray-600 w-full" />
      <div class="flex-grow overflow-auto">
        <div class="flex items-center w-full">
          <div class="bg-zinc-950 rounded-xl p-4 flex flex-col" v-if="postuser">
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
                  >"{{ quote.title.en }}" movie-<span
                    class="text-orange-200 mr-1"
                  >
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
                  <span class="text-white mr-2">{{
                    quote.comments.length
                  }}</span>
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
            <div class="mt-4 mb-2">
              <div class="flex items-center ml-2">
                <img
                  class="w-10 h-10 rounded-full bg-gray-400"
                  :src="
                    backendurl +
                    '/storage/' +
                    userStore.userData.profile_pictures
                  "
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { onMounted, ref } from "vue";
import IconChatSquare from "@/components/icons/IconChatSquare.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import CommentCard from "@/components/CommentCard.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";
const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
});

const userStore = useUserStore();

const postuser = ref();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
let movie = ref();
let Commentvalue = ref();
const showOptions = ref(false);

let quote = ref();
const id = props.quoteId;
const canEditQuote = ref();

const emit = defineEmits(["edit-quote", "delete-quote", "close"]);

const handleEditQuote = () => {
  emit("edit-quote", id);
  showOptions.value = true;
  emit("close");
};
const handleDeleteQuote = () => {
  emit("delete-quote", id);
  emit("close");
};
const closeThisModal = () => {
  emit("close");
};
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
    quote_id: id,
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
      quote_id: id,
    };
    makeApiPostRequest("/api/like", payload).then(() => {
      console.log("Like added successfully");
    });
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    let response = await instance.get(`/api/movie/${movieId}`);
    movie.value = response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(async () => {
  try {
    const quoteResponse = await instance.get(`/api/quote/${id}`);
    quote.value = quoteResponse.data.quote;
    await fetchMovieDetails(quoteResponse.data.quote.movie_id);
    if (userStore.userData.id === quote.value.user_id) {
      canEditQuote.value = true;
    } else canEditQuote.value = false;
    const userResponse = await instance.get(
      `/api/user/${quoteResponse.data.quote.user_id}`
    );
    postuser.value = userResponse.data.user;
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>
