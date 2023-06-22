<template>
  <ModalForAdd addclass="md:h-auto">
    <div class="text-xl text-white">Add Quote</div>
    <hr class="mt-4 mb-4 border border-gray-600 w-full" />
    <div class="flex items-center w-full">
      <img
        class="w-10 h-10 rounded-full bg-gray-400"
        :src="backendurl + '/storage/' + userStore.userData.profile_pictures"
        alt="profile picture"
      />
      <div class="ml-3 text-orange-200">
        {{ userStore.userData.username }}
      </div>
    </div>
    <Form
      @submit="submitForm"
      v-if="selectedMovie"
      class="flex flex-col w-full mt-2"
    >
      <InputFieldForAdd
        name="title[en]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="Start create new quote"
      />
      <InputFieldForAdd
        name="title[ka]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="ახალი ციტატა"
      />
      <div class="mb-3 mt-1">
        <Field
          as="select"
          id="movie"
          name="movie"
          v-model="selectedMovie.id"
          rules="required"
          :disabled="selectedMovie"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm text-white"
        >
          <option disabled value="" selected hidden>Choose a Movie</option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.name.en }}
          </option>
        </Field>
        <ErrorMessage name="movie" class="text-red-600 mt-1" />
      </div>
      <ImageUpload name="quote_image" rules="required" />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Submit
      </button>
    </Form>
    <div v-else>Loading...</div>
  </ModalForAdd>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import InputFieldForAdd from "@/components/InputFieldForAdd.vue";
import ModalForAdd from "@/components/Modals/ModalForAdd.vue";
import instance from "@/api/index.js";
import ImageUpload from "@/components/ImageUpload.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";

let router = useRouter();
let id = router.currentRoute.value.params.id;
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let selectedMovie = ref(null);
let movies = ref([]);

onMounted(async () => {
  try {
    const response = await instance.get("/api/usermovies");
    movies.value = response.data.movies;
    selectedMovie.value = movies.value.find(
      (movie) => movie.id === parseInt(id)
    );
  } catch (error) {
    console.error("Error:", error);
  }
});

const submitForm = (values) => {
  values.movie_id = selectedMovie.value.id;
  instance
    .post("/api/quote", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "MovieDetails", params: { id: id } });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>

<style scoped>
.minheight-9 {
  min-height: 36px;
}
</style>
