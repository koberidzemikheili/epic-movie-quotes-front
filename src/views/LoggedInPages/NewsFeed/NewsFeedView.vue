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

let pageInfo = ref({
  currentPage: 1,
  lastPage: null,
  loading: false,
});

const fetchquoteDetails = async () => {
  if (
    pageInfo.value.loading ||
    (pageInfo.value.lastPage &&
      pageInfo.value.currentPage > pageInfo.value.lastPage)
  ) {
    return;
  }

  pageInfo.value.loading = true;

  try {
    let response = await instance.get(
      `/api/quote?page=${pageInfo.value.currentPage}`
    );
    console.log(response.data);
    const newQuotes = response.data.quotes;
    newQuotes.forEach((quote) => {
      subscribeToQuoteComments(quote);
    });
    quotes.value = [...quotes.value, ...newQuotes];

    pageInfo.value.lastPage = response.data.quotes.last_page;
    pageInfo.value.currentPage++;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pageInfo.value.loading = false;
  }
};

const subscribeToQuoteComments = (quote) => {
  const channelName = "comments." + quote.id;
  window.Echo.channel(channelName).listen("NewComment", (e) => {
    const updatedQuote = e.quote;
    const index = quotes.value.findIndex(
      (quote) => quote.id === updatedQuote.id
    );
    if (index !== -1) {
      quotes.value[index] = updatedQuote;
    }
    console.log(e, "gaigzavna komentaris gamo notifikacia");
  });
};

watchEffect(() => {
  idForTracking.value = route.params.id;
});

onMounted(async () => {
  await fetchquoteDetails();
  pusherActive.value = instantiatePusher();

  await window.Echo.channel("likes").listen("UserLikedQuote", (e) => {
    const updatedQuote = e.quote;
    const index = quotes.value.findIndex(
      (quote) => quote.id === updatedQuote.id
    );
    if (index !== -1) {
      quotes.value[index] = updatedQuote;
    }
    console.log(e, "likeebi");
  });

  window.addEventListener("scroll", async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      await fetchquoteDetails();
    }
  });
});

onUnmounted(() => {
  window.Echo.leave("likes");
  window.removeEventListener("scroll", fetchquoteDetails);
});

const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
