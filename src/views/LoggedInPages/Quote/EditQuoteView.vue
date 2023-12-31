<template>
  <TheMainPage>
    <div
      class="fixed inset-0 flex items-center justify-center z-9 bg-black bg-opacity-5 backdrop-blur-sm"
    >
      <div
        class="bg-cardgray p-6 md:w-1/3 w-screen h-screen md:h-5/6 flex flex-col overflow-hidden"
      >
        <div class="flex items-center justify-between">
          <button @click="DeleteQuote" class="text-white rounded ml-4 flex">
            <IconTrashCan /> {{ $t("moviepage.labels.deletequote") }}
          </button>
          <div class="text-xl text-white">
            {{ $t("moviepage.texts.editquote") }}
          </div>
          <button class="text-white text-2xl ml-12" @click="closeModal">
            &times;
          </button>
        </div>
        <hr class="mt-4 mb-4 border-x border-gray-600 w-full" />
        <div class="flex items-center w-full">
          <img
            class="w-10 h-10 rounded-full bg-gray-400"
            :src="
              backendurl +
              '/storage/' +
              userStore.userData.user.profile_pictures
            "
            alt="profile picture"
          />
          <div class="ml-3 text-orange-200">
            {{ userStore.userData.user.username }}
          </div>
        </div>
        <div v-if="!isLoading">
          <Form @submit="submitForm" class="flex flex-col w-full mt-2">
            <InputFieldforEditQuote
              name="title[en]"
              type="textarea"
              as="textarea"
              addclass="h-20"
              placeholder="Movie Name"
              rules="required|min:3|english"
              :error="errorMessage?.errors?.['title.en']?.[0] || ''"
              v-model="formValues.title.en"
              langplaceholder="Eng"
            />
            <InputFieldforEditQuote
              name="title[ka]"
              type="textarea"
              as="textarea"
              addclass="h-20"
              placeholder="ფილმის სახელი"
              rules="required|min:3|georgian"
              :error="errorMessage?.errors?.['title.ka']?.[0] || ''"
              v-model="formValues.title.ka"
              langplaceholder="ქარ"
            />
            <ImageEditQuote
              v-model="formValues.quote_image"
              name="quote_image"
              addclass="h-32"
              :currentImage="backendurl + '/storage/' + formValues.quote_image"
            />
            <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
              {{ $t("moviepage.buttons.submit") }}
            </button>
          </Form>
        </div>
      </div>
    </div>
  </TheMainPage>
</template>

<script setup>
import TheMainPage from "@/components/TheMainPage.vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import { ref, onMounted, watch } from "vue";
import { Form } from "vee-validate";
import InputFieldforEditQuote from "@/components/InputFieldforEditQuote.vue";
import ImageEditQuote from "@/components/ImageEditQuote.vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";
import { deleteQuote, fetchSingleQuote, editQuote } from "@/api/apiService.js";

const { locale } = useI18n();
let router = useRouter();
let id = router.currentRoute.value.params.id;
let depth = parseInt(router.currentRoute.value.query.depth || 1);

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let formValues = ref({});

let isLoading = ref(true);
let errorMessage = ref("");

const closeModal = () => {
  router.go(-depth);
};
const DeleteQuote = async () => {
  try {
    const response = await deleteQuote(id);
    if (response.status === 201) {
      closeModal();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(async () => {
  try {
    let response = await fetchSingleQuote(id);
    let quote = response.data.quote;
    formValues.value = {
      ...quote,
      quote_image: quote.quote_image,
    };
    isLoading.value = false;
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
  values.movie_id = formValues.value.movie_id;
  if (!(values.quote_image instanceof Blob)) {
    values.quote_image = "";
  }
  values._method = "PUT";
  editQuote(id, values)
    .then((response) => {
      if (response.status === 200) {
        closeModal();
      }
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
    });
};
</script>
