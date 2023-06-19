<template>
  <TheMainPage>
    <div class="w-full">
      <div class="mt-2 flex flex justify-between w-full items-center">
        <div class="text-white mb-2 sm:mb-0 flex items-center">
          <div class="text-lg font-bold">My list of movies</div>
          <div class="ml-1">(total {{ movies.length }})</div>
        </div>
        <div>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search"
            class="py-1 px-2 rounded mr-2 bg-transparent text-white mb-2 sm:mb-0 hidden lg:inline-block"
          />
          <button
            @click="openModal('AddMovie')"
            class="bg-red-600 text-white py-1 px-2 rounded"
          >
            add movies
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
            :alt="movie.name.en"
          />
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-white mb-2">
              {{ movie.name.en }}({{ movie.year }})
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
import instance from "@/api/index.js";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import { useRoute } from "vue-router";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const route = useRoute();
const idForTracking = ref(route.params.id);

let searchTerm = ref("");

const movies = ref([]);

const fetchMovies = async () => {
  try {
    const response = await instance.get("/api/usermovies");
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
    movie.name.en.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const goToMovie = (id) => {
  router.push({ name: "MovieDetails", params: { id: id } });
};

const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
