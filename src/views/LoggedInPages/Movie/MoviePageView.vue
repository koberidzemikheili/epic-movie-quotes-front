<template>
  <TheMainPage>
    <div class="lg:mx-0 mx-8">
      <div class="mt-2 flex flex justify-between w-full items-center">
        <div class="text-white mb-2 sm:mb-0 md:flex items-center">
          <div class="text-lg font-bold">
            {{ $t("moviepage.texts.mylistofmovies") }}
          </div>
          <div class="ml-1">
            ({{ $t("moviepage.labels.total") }} {{ movies.length }})
          </div>
        </div>
        <div class="flex">
          <input
            type="text"
            v-model="searchTerm"
            :placeholder="$t('moviepage.labels.search')"
            class="py-1 px-2 rounded mr-4 bg-transparent text-white mb-2 sm:mb-0 hidden lg:inline-block"
          />
          <button
            @click="openModal('AddMovie')"
            class="bg-red-600 text-white py-1 px-2 rounded flex items-center"
          >
            <IconPlusAdd class="md:mr-2 mr-1" />
            {{ $t("moviepage.buttons.addmovie") }}
          </button>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-4">
        <div
          class="rounded-lg shadow-md"
          v-for="movie in filteredMovies"
          :key="movie.id"
          @click="goToMovie(movie.id)"
        >
          <img
            class="w-full h-64 rounded-md object-cover mb-4"
            :src="backendurl + '/storage/' + movie.movie_image"
            :alt="movie.name[locale]"
          />
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-white mb-2">
              {{ movie.name[locale] }}({{ movie.year }})
            </h2>
          </div>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-white mb-2 flex items-center">
              <div class="mr-2">{{ movie.quotes.length }}</div>
              <IconChatQuote />
            </h2>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import { ref, onMounted, watchEffect, computed } from "vue";
import router from "@/router";
import { fetchUserMovies } from "@/api/apiService.js";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import IconPlusAdd from "@/components/icons/IconPlusAdd.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const route = useRoute();
const idForTracking = ref(route.params.id);

let searchTerm = ref("");

const movies = ref([]);

const fetchMovies = async () => {
  try {
    const response = await await fetchUserMovies();
    movies.value = response.data.movies;
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(fetchMovies);

watchEffect(() => {
  idForTracking.value = route.params.id;
  fetchMovies();
});

let filteredMovies = computed(() => {
  return movies.value.filter((movie) =>
    movie.name[locale.value]
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  );
});

const goToMovie = (id) => {
  router.push({ name: "MovieDetails", params: { id: id } });
};

const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
