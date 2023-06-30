<template>
  <TheMainPage>
    <div
      class="fixed inset-0 flex items-center justify-center z-9 bg-black bg-opacity-5 backdrop-blur-sm"
      v-if="quote"
    >
      <div
        class="bg-stone-950 p-6 md:w-1/3 w-screen h-screen md:h-full md:mt-10 flex flex-col overflow-hidden"
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
          <div class="text-xl text-white">View Quote</div>
          <button class="text-white text-2xl ml-12" @click="closeModal">
            &times;
          </button>
        </div>
        <div
          class="bg-zinc-950 rounded-xl p-4 flex flex-col h-full overflow-hidden"
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
              <div class="text-white flex items-center mb-2 flex-col">
                <div
                  class="w-full border border-gray-600 rounded h-9 text-lg flex items-center justify-between mb-2"
                >
                  <div class="ml-2 italic">"{{ quote.title.en }}"</div>
                  <div class="text-gray-600 mr-2">Eng</div>
                </div>
                <div
                  class="w-full border border-gray-600 rounded h-9 text-lg flex items-center justify-between mb-2"
                >
                  <div class="ml-2 italic">"{{ quote.title.ka }}"</div>
                  <div class="text-gray-600 mr-2">ქარ</div>
                </div>
              </div>
              <img
                class="w-full h-2/3"
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
                class="w-full py-2 px-4 rounded bg-gray-800 ml-2 text-white"
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
import IconLike from "@/components/icons/IconLike.vue";
import CommentCard from "@/components/CommentCard.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";
import instantiatePusher from "@/helpers/instantiatePusher.js";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { useRouter } from "vue-router";
let router = useRouter();

let id = router.currentRoute.value.params.id;
const userStore = useUserStore();

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const quote = ref();
const postuser = ref();
const movie = ref();
let Commentvalue = ref();
const pusherActive = ref(false);
const canEditQuote = ref();

async function fetchQuote(id) {
  try {
    let response = await instance.get(`/api/quote/${id}`);
    let data = response.data.quote;
    quote.value = data;
    postuser.value = quote.value.user;
    movie.value = quote.value.movie;
    console.log(quote.value);
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

  await window.Echo.channel("likes").listen("UserLikedQuote", (e) => {
    quote.value = e.quote;
    postuser.value = quote.value.user;
    movie.value = quote.value.movie;
    console.log(e, "likeebi");
  });

  const channelName = "comments." + quote.value.id;
  window.Echo.channel(channelName).listen("NewComment", (e) => {
    quote.value = e.quote;
    postuser.value = quote.value.user;
    movie.value = quote.value.movie;
    console.log(e, "gaigzavna komentaris gamo notifikacia");
  });
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
    quote_id: quote.value.id,
    comment: Commentvalue.value,
    quote_userid: quote.value.user_id,
  };
  makeApiPostRequest("/api/comment", payload);
};

const addLike = () => {
  const userLike = quote.value.likes.find(
    (like) => like.user_id === userStore.userData.user.id
  );

  if (userLike) {
    instance
      .delete(`/api/like/${userLike.id}`)
      .then(() => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    const payload = {
      quote_id: quote.value.id,
      quote_userid: quote.value.user_id,
    };
    makeApiPostRequest("/api/like", payload).then(() => {});
  }
};
const closeModal = () => {
  router.go(-1);
};
const DeleteQuote = async () => {
  await instance
    .delete(`/api/quote/${id}`)
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