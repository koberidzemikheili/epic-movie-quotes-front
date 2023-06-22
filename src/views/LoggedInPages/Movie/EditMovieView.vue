<template>
  <ModalForAdd addclass="md:h-auto">
    <div class="text-xl text-white">Edit Movie</div>
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
    <div v-if="!isLoading">
      <Form @submit="submitForm" class="flex flex-col w-full mt-2">
        <InputFieldForEdit
          name="name[en]"
          type="text"
          rules="required|min:3"
          placeholder="Movie Name"
          v-model="formValues.name.en"
        />
        <InputFieldForEdit
          name="name[ka]"
          type="text"
          rules="required|min:3"
          placeholder="ფილმის სახელი"
          v-model="formValues.name.ka"
        />
        <ChipInputFieldForEdit name="genres" v-model="formValues.genres" />
        <InputFieldForEdit
          name="year"
          type="text"
          rules="required|numeric|min:3"
          placeholder="წელი/Year"
          v-model="formValues.year"
        />
        <InputFieldForEdit
          name="director[en]"
          type="text"
          rules="required|min:3"
          placeholder="Director"
          v-model="formValues.director.en"
        />
        <InputFieldForEdit
          name="director[ka]"
          type="text"
          rules="required|min:3"
          placeholder="რეჟისორი"
          v-model="formValues.director.ka"
        />
        <InputFieldForEdit
          name="description[en]"
          type="textarea"
          as="textarea"
          rules="required|min:3"
          addclass="h-20"
          placeholder="Description"
          v-model="formValues.description.en"
        />
        <InputFieldForEdit
          name="description[ka]"
          type="textarea"
          as="textarea"
          rules="required|min:3"
          addclass="h-20"
          placeholder="აღწერა"
          v-model="formValues.description.ka"
        />
        <ImageEdit
          v-model="formValues.movie_image"
          name="movie_image"
          addclass="h-32"
          :currentImage="backendurl + '/storage/' + formValues.movie_image"
        />
        <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
          Submit
        </button>
      </Form>
    </div>
    <div v-else>Loading...</div>
  </ModalForAdd>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";
import InputFieldForEdit from "@/components/InputFieldForEdit.vue";
import ModalForAdd from "@/components/Modals/ModalForAdd.vue";
import instance from "@/api/index.js";
import ChipInputFieldForEdit from "@/components/ChipInputFieldForEdit.vue";
import ImageEdit from "@/components/ImageEdit.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let formValues = ref({});

let router = useRouter();
let id = router.currentRoute.value.params.id;
let isLoading = ref(true);

onMounted(async () => {
  try {
    let response = await instance.get(`/api/movie/${id}`);
    let movie = response.data;
    formValues.value = {
      ...movie,
      genres: movie.genres,
      movie_image: movie.movie_image,
    };
    isLoading.value = false;
  } catch (error) {
    console.error("Error:", error);
  }
});

const submitForm = (values) => {
  values.genres = formValues.value.genres;
  values._method = "PUT";
  instance
    .post(`/api/movie/${id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        router.push({ name: "MovieDetails", params: { id: id } });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>