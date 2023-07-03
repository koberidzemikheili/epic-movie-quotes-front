<template>
  <ModalForAdd addclass="md:h-auto">
    <div class="text-xl text-white">{{ $t("moviepage.labels.addmovie") }}</div>
    <hr class="mt-4 mb-4 border border-gray-600 w-full" />
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
        name="name[en]"
        type="text"
        placeholder="Movie Name"
        rules="required|min:3"
        :error="errorMessage?.errors?.['name.en']?.[0] || ''"
      />
      <InputFieldForAdd
        name="name[ka]"
        type="text"
        placeholder="ფილმის სახელი"
        rules="required|min:3"
        :error="errorMessage?.errors?.['name.ka']?.[0] || ''"
      />
      <ChipInputField
        v-model="genres"
        name="genres"
        rules="required"
        :error="errorMessage?.errors?.['year']?.[0] || ''"
      />
      <InputFieldForAdd
        name="year"
        type="text"
        placeholder="წელი/Year"
        rules="required|numeric|min:3"
        :error="errorMessage?.errors?.['year']?.[0] || ''"
      />
      <InputFieldForAdd
        name="director[en]"
        type="text"
        placeholder="Director"
        rules="required|min:3"
        :error="errorMessage?.errors?.['director.en']?.[0] || ''"
      />
      <InputFieldForAdd
        name="director[ka]"
        type="text"
        placeholder="რეჟისორი"
        rules="required|min:3"
        :error="errorMessage?.errors?.['director.ka']?.[0] || ''"
      />
      <InputFieldForAdd
        name="description[en]"
        type="textarea"
        as="textarea"
        addclass="h-20"
        placeholder="Description"
        rules="required|min:3"
        :error="errorMessage?.errors?.['description.en']?.[0] || ''"
      />
      <InputFieldForAdd
        name="description[ka]"
        type="textarea"
        as="textarea"
        addclass="h-20"
        placeholder="აღწერა"
        rules="required|min:3"
        :error="errorMessage?.errors?.['description.ka']?.[0] || ''"
      />
      <ImageUpload
        name="movie_image"
        rules="required"
        :error="errorMessage?.errors?.['movie_image']?.[0] || ''"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        {{ $t("moviepage.buttons.submit") }}
      </button>
    </Form>
  </ModalForAdd>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { Form } from "vee-validate";
import InputFieldForAdd from "@/components/InputFieldForAdd.vue";
import ModalForAdd from "@/components/Modals/ModalForAdd.vue";
import instance from "@/api/index.js";
import ChipInputField from "@/components/ChipInputField.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
let router = useRouter();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let genres = ref([]);
let errorMessage = ref("");

const submitForm = (values) => {
  values.genres = genres.value;
  instance
    .post("/api/movie", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "MoviePage" });
      }
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
    });
};
onMounted(() => {
  if (localStorage.getItem("last-locale")) {
    setLocale(localStorage.getItem("last-locale"));
  } else setLocale("en");
});

watch(locale, (newLocale) => {
  setLocale(newLocale);
});
</script>
