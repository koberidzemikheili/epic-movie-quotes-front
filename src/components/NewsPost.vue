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
          >"{{ quote.title[locale] }}" movie-<span class="text-orange-200 mr-1">
            {{ movie.name[locale] }}</span
          >
          <span>({{ movie.year }})</span></span
        >
      </div>
      <img
        class="w-full h-2/3"
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
        v-for="comment in displayedComments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <button v-if="showMoreButton" @click="showMoreComments" class="text-white">
      {{ $t("newsfeed.buttons.loadmorecomments") }}
    </button>
    <div class="mt-4">
      <div class="flex items-center ml-2">
        <img
          class="w-10 h-10 rounded-full bg-gray-400"
          :src="
            backendurl + '/storage/' + userStore.userData.user.profile_pictures
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
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import IconChatSquare from "@/components/icons/IconChatSquare.vue";
import IconLike from "@/components/icons/IconLike.vue";
import CommentCard from "@/components/CommentCard.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
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
let quote = ref(props.quote);

const visibleCommentsCount = ref(3);
const showMoreButton = ref(true);

const displayedComments = computed(() => {
  return quote.value.comments.slice(0, visibleCommentsCount.value);
});

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
    quote_userid: props.quote.user_id,
  };
  makeApiPostRequest("/api/comment", payload);
};

const addLike = () => {
  console.log(quote.value.likes);
  const userLikes = quote.value.likes.filter(
    (like) => like.user_id === userStore.userData.user.id
  );

  if (userLikes.length > 0) {
    const payload = {
      quote_id: props.quote.id,
      user_id: userStore.userData.user.id,
    };
    instance
      .delete(`/api/like`, { data: payload })
      .then(() => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    const payload = {
      quote_id: props.quote.id,
      quote_userid: props.quote.user_id,
    };
    makeApiPostRequest("/api/like", payload).then(() => {});
  }
};

const showMoreComments = () => {
  visibleCommentsCount.value += 3;
};

watch(visibleCommentsCount, (newVal) => {
  if (newVal >= quote.value.comments.length) {
    showMoreButton.value = false;
  } else {
    showMoreButton.value = true;
  }
});

onMounted(async () => {
  postuser.value = props.quote.user;
  movie.value = props.quote.movie;
  if (quote.value.comments.length <= visibleCommentsCount.value) {
    showMoreButton.value = false;
  }
});
</script>
