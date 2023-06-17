<template>
  <TheMainPage>
    <div class="w-full">
      <div class="mt-2">
        <div class="text-white">My list of movies total:</div>
        <button
          @click="openModal('AddMovie')"
          class="bg-red-600 text-white py-1 px-2 rounded"
        >
          add movies
        </button>
      </div>
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-4">
        <div
          class="rounded-lg shadow-md"
          v-for="movie in movies"
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
        </div>
      </div>
      <router-view />
    </div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import { ref, onMounted } from "vue";
import router from "@/router";
import instance from "@/api/index.js";
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const movies = ref([]);
onMounted(async () => {
  try {
    const response = await instance.get("/api/movies");
    movies.value = response.data.movies;
    console.log(movies.value[5]);
  } catch (error) {
    console.error("Error:", error);
  }
});
const goToMovie = (id) => {
  router.push({ name: "MovieDetails", params: { id: id } });
};
const openModal = (pagename) => {
  router.push({ name: pagename });
};
</script>
