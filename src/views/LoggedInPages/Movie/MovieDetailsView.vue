<template>
  <TheMainPage>
    <div v-if="movie" class="p-4">
      <div class="text-white text-xl mt-2 font-bold">Movie Description</div>
      <div class="flex mt-4">
        <div class="w-1/2">
          <img
            class="w-full h-auto object-cover rounded-md"
            :src="backendurl + '/storage/' + movie.movie_image"
            :alt="movie.name.en"
          />
        </div>
        <div class="w-1/2 pl-4">
          <div class="flex justify-between">
            <div class="text-lg font-bold text-orange-200">
              {{ movie.name.en }} ({{ movie.year }})
            </div>
            <div class="flex bg-gray-800 p-2 rounded-md px-4">
              <button class="text-white rounded mr-4"><IconPencil /></button>
              <div class="w-px bg-gray-500 h-full"></div>
              <button class="text-white rounded ml-4"><IconTrashCan /></button>
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
          <div class="text-white mt-2">Director: {{ movie.director.en }}</div>
          <div class="text-white mt-2 break-words">
            {{ movie.description.en }}
          </div>
        </div>
      </div>
      <div class="mt-4 w-1/2">
        <div class="flex justify-between items-center">
          <div class="text-white text-xl font-bold">
            Quotes (total {{ movie.quotes.length }})
          </div>
          <button class="bg-red-500 text-white py-1 px-2 rounded">
            Add Quote
          </button>
        </div>
        <div class="flex flex-col mt-4">
          <div
            class="flex items-center bg-zinc-950 shadow-lg rounded-lg p-4 mt-4"
            v-for="quote in movie.quotes"
            :key="quote.id"
          >
            <img
              class="w-20 h-20 object-cover rounded-lg mr-4"
              :src="backendurl + '/storage/' + quote.quote_image"
              :alt="quote.title"
            />
            <div class="text-white">{{ quote.title.en }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import instance from "@/api/index.js";
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

let movie = ref(null);
let router = useRouter();
let id = router.currentRoute.value.params.id;

onMounted(async () => {
  try {
    let response = await instance.get(`/api/movie/${id}`);
    movie.value = response.data.movie;
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>
