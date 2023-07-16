<template>
  <TheMainPage>
    <div
      class="fixed inset-0 flex items-center justify-center z-9 bg-black bg-opacity-5 backdrop-blur-sm"
      v-if="quote"
    >
      <div
        class="bg-cardgray p-6 md:w-1/3 w-screen h-screen md:h-full md:mt-10 flex flex-col overflow-hidden"
      >
        <div class="flex items-center justify-between">
          <div class="flex rounded-md" v-if="canEditQuote">
            <button @click="EditQuote" class="text-white rounded mr-4">
              <IconPencil />
            </button>
            <div class="w-px bg-gray-500 h-6"></div>
            <button @click="DeleteQuote" class="text-white rounded ml-4">
              <IconTrashCan />
            </button>
          </div>
          <div class="text-xl text-white hidden md:block">
            {{ $t("moviepage.texts.viewquote") }}
          </div>
          <button class="text-white text-2xl ml-12" @click="closeModal">
            &times;
          </button>
        </div>
        <hr class="border-x border-gray-600 w-full mt-4" />
        <div
          class="bg-cardgray rounded-xl p-4 flex flex-col h-full overflow-hidden"
          v-if="postuser"
        >
          <div class="flex-none">
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
              <div class="text-white flex items-center mb-2 flex-col text-md">
                <div
                  class="w-full border border-gray-600 rounded md:h-9 h-14 text-md flex justify-between mb-2"
                >
                  <div class="ml-2 mt-1 italic">"{{ quote.title.en }}"</div>
                  <div class="text-gray-600 mr-2">Eng</div>
                </div>
                <div
                  class="w-full border border-gray-600 rounded md:h-9 h-14 text-md flex justify-between mb-2"
                >
                  <div class="ml-2 mt-1 italic">"{{ quote.title.ka }}"</div>
                  <div class="text-gray-600 mr-2">ქარ</div>
                </div>
              </div>
              <div class="w-full md:h-120 h-52">
                <img
                  class="w-full h-full object-fit rounded-lg"
                  :src="backendurl + '/storage/' + quote.quote_image"
                  alt="quote image"
                />
              </div>
              <div class="flex items-center mt-2">
                <div class="flex items-center">
                  <span class="text-white mr-2">{{
                    quote.comments.length
                  }}</span>
                  <IconChatSquare class="w-6" />
                </div>
                <div class="flex items-center ml-5">
                  <span class="text-white mr-2">{{ quote.likes.length }}</span>
                  <button @click="addLike">
                    <IconHeartFill v-if="isLiked" /><IconLike
                      class="w-6"
                      v-if="!isLiked"
                    />
                  </button>
                </div>
              </div>
            </div>
            <hr class="border-x border-gray-600 w-full mb-4" />
          </div>
          <div class="flex-grow overflow-auto no-scrollbar">
            <CommentCard
              v-for="comment in quote.comments"
              :key="comment.id"
              :comment="comment"
            />
          </div>
          <div class="flex-none mt-4">
            <div class="flex items-center ml-2">
              <img
                class="w-10 h-10 rounded-full bg-gray-400"
                :src="
                  backendurl +
                  '/storage/' +
                  userStore.userData.user.profile_pictures
                "
                alt="profile picture"
              />
              <input
                type="text"
                v-model="Commentvalue"
                placeholder="Write a Comment"
                @keyup.enter="savecomment"
                class="w-full py-2 px-4 rounded bg-navbargray ml-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import { onMounted, ref } from "vue";
import IconChatSquare from "@/components/icons/IconChatSquare.vue";
import IconHeartFill from "@/components/icons/IconHeartFill.vue";
import IconLike from "@/components/icons/IconLike.vue";
import CommentCard from "@/components/CommentCard.vue";
import {
  makeApiPostRequest,
  fetchSingleQuote,
  unlike,
  deleteQuote,
} from "@/api/apiService.js";
import { useUserStore } from "@/stores/user.js";
import instantiatePusher from "@/helpers/instantiatePusher.js";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { useRouter } from "vue-router";

let router = useRouter();

let id = router.currentRoute.value.params.id;
const userStore = useUserStore();

const isLiked = ref();
const isInProgress = ref();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const quote = ref();
const postuser = ref();
const movie = ref();
let Commentvalue = ref();
const pusherActive = ref(false);
const canEditQuote = ref();

async function fetchQuote(id) {
  try {
    let response = await fetchSingleQuote(id);
    let data = response.data.quote;
    quote.value = data;
    postuser.value = quote.value.user;
    movie.value = quote.value.movie;
    isInProgress.value = false;
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(async () => {
  await fetchQuote(id);
  if (userStore.userData.user.id === quote.value.user_id) {
    canEditQuote.value = true;
  } else canEditQuote.value = false;

  pusherActive.value = instantiatePusher();

  await window.Echo.channel("likes").listen("UserLikedQuote", () => {
    fetchQuote(id);
  });

  const channelName = "comments." + quote.value.id;
  window.Echo.channel(channelName).listen("NewComment", () => {
    fetchQuote(id);
  });

  isLiked.value = quote.value.likes.some(
    (like) => like.user_id === userStore.userData.user.id
  );
});

const savecomment = () => {
  const payload = {
    quote_id: quote.value.id,
    comment: Commentvalue.value,
    quote_userid: quote.value.user_id,
  };
  makeApiPostRequest("/api/comment", payload)
    .then((response) => {
      if (response.status === 201) {
        Commentvalue.value = "";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addLike = () => {
  const userLikes = quote.value.likes.filter(
    (like) => like.user_id === userStore.userData.user.id
  );

  if (userLikes.length > 0 && isInProgress.value === false) {
    isInProgress.value = true;
    const payload = {
      quote_id: quote.value.id,
      user_id: userStore.userData.user.id,
    };
    unlike(payload)
      .then(() => {
        isLiked.value = false;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if (userLikes.length <= 0 && isInProgress.value === false) {
    isInProgress.value = true;
    const payload = {
      quote_id: quote.value.id,
      quote_userid: quote.value.user_id,
    };
    makeApiPostRequest("/api/like", payload)
      .then(() => {
        isLiked.value = true;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
const closeModal = () => {
  router.go(-1);
};
const DeleteQuote = async () => {
  await deleteQuote(id)
    .then((response) => {
      if (response.status === 201) {
        closeModal();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const EditQuote = () => {
  router.push({ name: "EditQuote", params: { id: id }, query: { depth: 2 } });
};
</script>
