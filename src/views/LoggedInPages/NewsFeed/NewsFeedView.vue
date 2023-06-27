<template>
  <TheMainPage>
    <div class="w-full lg:w-2/3">
      <div class="flex mt-6">
        <button
          :class="searchActive ? 'w-2/6' : 'w-5/6'"
          @click="openModal('AddQuote')"
          class="bg-gray-800 mr-4 py-2 rounded-lg text-left flex"
        >
          <div class="mx-2"><IconPencilSquare /></div>
          <div class="text-white">Write new quote</div>
        </button>
        <input
          :class="searchActive ? 'w-5/6' : 'w-1/6'"
          class="bg-transparent rounded-lg md:block hidden"
          type="text"
          :placeholder="
            searchActive
              ? 'Enter @ to search movies, Enter # to search quotes.'
              : 'Search by'
          "
          @focus="searchActive = true"
          @blur="searchActive = false"
        />
      </div>
      <div
        v-for="quote in quotes"
        :key="quote.id + '-' + quote.likes.length + '-' + quote.comments.length"
        class="mt-6"
      >
        <NewsPost :quote="quote" />
      </div>
      <router-view />
    </div>
    <div class="w-full lg:w-1/3"></div>
  </TheMainPage>
</template>

<script setup>
import { ref, onMounted, watchEffect, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import instance from "@/api/index.js";
import IconPencilSquare from "@/components/icons/IconPencilSquare.vue";
import TheMainPage from "@/components/TheMainPage.vue";
import NewsPost from "@/components/NewsPost.vue";
import instantiatePusher from "@/helpers/instantiatePusher.js";

let quotes = ref([]);
let searchActive = ref(false);
let router = useRouter();
const pusherActive = ref(false);

const route = useRoute();
const idForTracking = ref(route.params.id);

const fetchquoteDetails = async () => {
  try {
    let response = await instance.get(`/api/quote`);
    quotes.value = [...response.data.quotes];
    console.log(quotes.value);
  } catch (error) {
    console.error("Error:", error);
  }
};

watchEffect(() => {
  idForTracking.value = route.params.id;
  //fetchquoteDetails();
});

onMounted(async () => {
  await fetchquoteDetails();
  pusherActive.value = instantiatePusher();

  await window.Echo.channel("likes").listen("UserLikedQuote", (e) => {
    fetchquoteDetails();
    console.log(e, "likeebi");
  });

  quotes.value.forEach((quote) => {
    const channelName = "comments." + quote.id;
    window.Echo.channel(channelName).listen("NewComment", (e) => {
      fetchquoteDetails();
      console.log(e, "gaigzavna komentaris gamo notifikacia");
    });
  });
});
onUnmounted(() => {
  window.Echo.leave("likes");
});

const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
