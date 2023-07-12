<template>
  <ModalForAdd addclass="md:h-auto">
    <div class="text-xl text-white">{{ $t("newsfeed.labels.addquote") }}</div>
    <hr class="mt-4 mb-4 border-x border-gray-600 w-full" />
    <div class="flex items-center w-full">
      <img
        class="w-10 h-10 rounded-full bg-gray-400"
        :src="
          backendurl + '/storage/' + userStore.userData.user.profile_pictures
        "
        alt="profile picture"
      />
      <div class="ml-3 text-orange-200">
        {{ userStore.userData.user.username }}
      </div>
    </div>
    <Form @submit="submitForm" class="flex flex-col w-full mt-2">
      <InputFieldForAdd
        name="title[en]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="Start create new quote"
        :error="errorMessage?.errors?.['title.en']?.[0] || ''"
        langplaceholder="Eng"
      />
      <InputFieldForAdd
        name="title[ka]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="ახალი ციტატა"
        :error="errorMessage?.errors?.['title.ka']?.[0] || ''"
        langplaceholder="ქარ"
      />
      <div class="mb-3 mt-1">
        <Field
          as="select"
          id="movie"
          name="movie"
          v-model="selectedMovie"
          rules="required"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm text-white"
        >
          <option disabled value="" selected hidden>
            <div class="flex">{{ $t("newsfeed.labels.chooseamovie") }}</div>
          </option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.name.en }}
          </option>
        </Field>
        <ErrorMessage name="movie" class="text-red-600 mt-1" />
      </div>
      <ImageUpload
        v-model="quotepic"
        name="quote_picture"
        rules="required"
        :error="errorMessage?.errors?.['quote_image']?.[0] || ''"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        {{ $t("newsfeed.buttons.submit") }}
      </button>
    </Form>
  </ModalForAdd>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import InputFieldForAdd from "@/components/InputFieldForAdd.vue";
import ModalForAdd from "@/components/Modals/ModalForAdd.vue";
import instance from "@/api/index.js";
import ImageUpload from "@/components/ImageUpload.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
let router = useRouter();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let quotepic = ref();
let selectedMovie = ref(null);
let movies = ref([]);
let errorMessage = ref("");

onMounted(async () => {
  try {
    const response = await instance.get("/api/movie");
    movies.value = response.data.movies;
  } catch (error) {
    console.error("Error:", error);
  }

  if (localStorage.getItem("last-locale")) {
    setLocale(localStorage.getItem("last-locale"));
  } else setLocale("en");
});

watch(locale, (newLocale) => {
  setLocale(newLocale);
});

const submitForm = (values) => {
  values.quote_image = quotepic.value;
  values.movie_id = selectedMovie.value;
  instance
    .post("/api/quote", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "NewsFeed" });
      }
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
    });
};
</script>
<style scoped>
.minheight-9 {
  min-height: 36px;
}
</style>
