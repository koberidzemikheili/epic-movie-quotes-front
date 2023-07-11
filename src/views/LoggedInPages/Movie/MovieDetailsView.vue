<template>
  <TheMainPage>
    <div v-if="movie" class="p-4">
      <div class="text-white text-xl mt-2 font-bold">
        {{ $t("moviepage.texts.moviedescription") }}
      </div>
      <div class="flex md:flex-row flex-col mt-4">
        <div class="md:w-1/2 w-full">
          <img
            class="w-full h-auto object-cover rounded-md"
            :src="backendurl + '/storage/' + movie.movie_image"
            :alt="movie.name[locale]"
          />
        </div>
        <div class="md:w-1/2 w-full md:pl-4 md:mt-0 mt-4">
          <div class="flex justify-between">
            <div class="text-lg font-bold text-orange-200">
              {{ movie.name[locale] }} ({{ movie.year }})
            </div>
            <div class="flex bg-navbargray p-2 rounded-md px-4">
              <button
                @click="OpenEditMovie(movie.id)"
                class="text-white rounded mr-4"
              >
                <IconPencil />
              </button>
              <div class="w-px bg-gray-500 h-full"></div>
              <button
                @click="DeleteMovie(movie.id)"
                class="text-white rounded ml-4"
              >
                <IconTrashCan />
              </button>
            </div>
          </div>
          <div class="mt-2">
            <div
              class="inline-block bg-gray-500 text-white py-1 px-2 rounded mr-1"
              v-for="genre in movie.genres"
              :key="genre.id"
            >
              {{ genre.genre }}
            </div>
          </div>
          <div class="text-white mt-2">
            {{ $t("moviepage.labels.director") }}: {{ movie.director[locale] }}
          </div>
          <div class="text-white mt-2 break-words">
            {{ movie.description[locale] }}
          </div>
        </div>
      </div>
      <div class="mt-4 md:w-1/2 w-full">
        <div class="flex justify-between items-center">
          <div class="text-white text-xl font-bold">
            {{ $t("moviepage.labels.quote") }} ({{
              $t("moviepage.labels.total")
            }}
            {{ movie.quotes.length }})
          </div>
          <button
            @click="OpenAddQuote(movie.id)"
            class="bg-red-600 text-white py-1 px-2 rounded"
          >
            {{ $t("moviepage.buttons.addquote") }}
          </button>
        </div>
        <div class="flex flex-col mt-4">
          <QuoteCard
            v-for="quote in movie.quotes"
            :key="quote.id"
            :quote="quote"
            @view-quote="OpenViewQuote"
            @edit-quote="OpenEditQuote"
            @delete-quote="DeleteQuote"
          />
        </div>
      </div>
      <router-view />
    </div>
    <div v-else>Loading...</div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import QuoteCard from "@/components/QuoteCard.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import instance from "@/api/index.js";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

let movie = ref(null);
let router = useRouter();
let id = router.currentRoute.value.params.id;
const route = useRoute();
const idForTracking = ref(route.params.id);

const fetchMovieDetails = async (movieId) => {
  try {
    let response = await instance.get(`/api/movie/${movieId}`);
    movie.value = response.data.movie;
  } catch (error) {
    console.error("Error:", error);
  }
};

watchEffect(() => {
  idForTracking.value = route.params.id;
  fetchMovieDetails(id);
});

onMounted(() => {
  fetchMovieDetails(id);
});

const OpenEditMovie = (id) => {
  router.push({ name: "EditMovie", params: { id: id } });
};
const OpenAddQuote = (id) => {
  router.push({ name: "AddMovieQuote", params: { id: id } });
};
const OpenViewQuote = (id) => {
  router.push({ name: "ViewQuote", params: { id: id } });
};
const OpenEditQuote = (id) => {
  router.push({ name: "EditQuote", params: { id: id } });
};

const DeleteMovie = async (id) => {
  await instance
    .delete(`/api/movie/${id}`)
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "MoviePage" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const DeleteQuote = async (quoteid) => {
  await instance
    .delete(`/api/quote/${quoteid}`)
    .then((response) => {
      if (response.status === 201) {
        fetchMovieDetails(id);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
