<template>
  <TheMainPage>
    <div class="w-full md:w-3/4 lg:w-2/4" :class="{ fixed: isModalOpen }">
      <IconScope
        @click="isModalOpen = true"
        class="absolute right-24 top-7 text-white block md:hidden cursor-pointer"
      />
      <SearchModal v-model:isOpen="isModalOpen" @mobile-search="search">
      </SearchModal>
      <div class="flex mt-6">
        <button
          :class="searchActive ? 'w-2/6' : 'w-5/6'"
          @click="openModal('AddQuote')"
          class="md:bg-navbargray mr-4 py-2 rounded-lg text-left flex"
        >
          <div class="mx-2"><IconPencilSquare /></div>
          <div class="text-white">
            {{ $t("newsfeed.buttons.writenewquote") }}
          </div>
        </button>
        <input
          v-model="searchTerm"
          :class="searchActive ? 'w-5/6' : 'w-1/6'"
          class="bg-transparent rounded-lg md:block hidden text-white"
          type="text"
          :placeholder="
            searchActive
              ? $t('newsfeed.buttons.search2')
              : $t('newsfeed.buttons.search1')
          "
          @focus="searchActive = true"
          @blur="searchActive = false"
          @keyup.enter="fetchquoteDetails(true)"
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
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import instance from "@/api/index.js";
import IconPencilSquare from "@/components/icons/IconPencilSquare.vue";
import IconScope from "@/components/icons/IconScope.vue";
import TheMainPage from "@/components/TheMainPage.vue";
import SearchModal from "@/components/Modals/SearchModal.vue";
import NewsPost from "@/components/NewsPost.vue";
import instantiatePusher from "@/helpers/instantiatePusher.js";

let isModalOpen = ref(false);
let quotes = ref([]);
let searchActive = ref(false);
let searchTerm = ref("");
let router = useRouter();
let route = useRoute();
const pusherActive = ref(false);

let pageInfo = ref({
  currentPage: 0,
  lastPage: null,
  loading: false,
});

const search = (term) => {
  searchTerm.value = term;
  fetchquoteDetails(true);
};

const fetchquoteDetails = async (newSearch = false) => {
  if (
    pageInfo.value.loading ||
    (pageInfo.value.lastPage &&
      pageInfo.value.currentPage > pageInfo.value.lastPage)
  ) {
    return;
  }
  if (newSearch) {
    pageInfo.value.currentPage = 1;

    quotes.value = [];
  }

  pageInfo.value.loading = true;

  try {
    let response = await instance.get(
      `/api/quote?page=${pageInfo.value.currentPage}`,
      {
        params: {
          searchBy: searchTerm.value,
        },
      }
    );
    const newQuotes = response.data.data;
    newQuotes.forEach((quote) => {
      subscribeToQuoteComments(quote);
    });
    quotes.value = [...quotes.value, ...newQuotes];
    pageInfo.value.lastPage = response.data.meta.last_page;

    if (!newSearch) {
      pageInfo.value.currentPage++;
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pageInfo.value.loading = false;
  }
};

const subscribeToQuoteComments = (quote) => {
  const channelName = "comments." + quote.id;
  window.Echo.channel(channelName).listen("NewComment", async (e) => {
    const updatedQuote = await fetchQuoteDetailsById(e.quote.id);

    const index = quotes.value.findIndex(
      (quote) => quote.id === updatedQuote.id
    );
    if (index !== -1) {
      quotes.value[index] = updatedQuote;
    }
  });
};

watch(
  () => route.name,
  async (newName, oldName) => {
    if (oldName === "AddQuote" && newName === "NewsFeed") {
      pageInfo.value.currentPage = 0;
      quotes.value = [];
      await fetchquoteDetails();
    }
  }
);

async function fetchQuoteDetailsById(id) {
  const quoteResponse = await instance.get(`/api/quote/${id}`);
  return quoteResponse.data.quote;
}

onMounted(async () => {
  await fetchquoteDetails();
  pusherActive.value = instantiatePusher();

  await window.Echo.channel("likes").listen("UserLikedQuote", async (e) => {
    const updatedQuote = await fetchQuoteDetailsById(e.quote.id);
    const index = quotes.value.findIndex(
      (quote) => quote.id === updatedQuote.id
    );
    if (index !== -1) {
      quotes.value[index] = updatedQuote;
    }
  });

  window.addEventListener("scroll", async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageInfo.value.currentPage < pageInfo.value.lastPage
    ) {
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
