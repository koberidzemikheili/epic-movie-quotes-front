<template>
  <div class="fixed inset-0 flex items-center justify-center z-9">
    <div
      class="bg-stone-950 p-6 md:w-1/3 w-screen h-screen md:h-5/6 flex flex-col"
    >
      <div class="flex items-center justify-between">
        <button @click="handleDeleteQuote" class="text-white rounded ml-4 flex">
          <IconTrashCan /> Delete
        </button>
        <div class="text-xl text-white">Edit Quote</div>
        <button class="text-white text-2xl ml-12" @click="closeThisModal">
          &times;
        </button>
      </div>
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
            name="title[en]"
            type="textarea"
            as="textarea"
            rules="required|min:3"
            addclass="h-20"
            placeholder="Movie Name"
            v-model="formValues.title.en"
          />
          <InputFieldForEdit
            name="title[ka]"
            type="textarea"
            as="textarea"
            rules="required|min:3"
            addclass="h-20"
            placeholder="ფილმის სახელი"
            v-model="formValues.title.ka"
          />
          <div
            class="w-full h-64 md:h-96 lg:h-96 relative flex items-center justify-center mt-2"
          >
            <img
              :src="
                newQuoteImage
                  ? newQuoteImage
                  : backendurl + '/storage/' + formValues.quote_image
              "
              class="rounded-lg w-full h-full object-cover"
            />
            <label
              class="text-white absolute bg-black bg-opacity-50 px-12 py-6 rounded-lg"
            >
              <IconPhotoCamera class="w-full" />
              <div>Change Photo</div>
              <Field
                type="file"
                name="quote_image"
                class="hidden"
                @change="handleFileSelect"
                v-model="formValues.quote_image"
              />
            </label>
          </div>

          <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import IconTrashCan from "@/components/icons/IconTrashCan.vue";
import IconPhotoCamera from "@/components/icons/IconPhotoCamera.vue";
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import InputFieldForEdit from "@/components/InputFieldForEdit.vue";
import instance from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";
const props = defineProps({
  quoteId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["delete-quote", "close"]);

const handleDeleteQuote = () => {
  emit("delete-quote", props.quoteId);
  emit("close");
};
const closeThisModal = () => {
  emit("close");
};
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let formValues = ref({});

let isLoading = ref(true);
let newQuoteImage = ref();

onMounted(async () => {
  try {
    let response = await instance.get(`/api/quote/${props.quoteId}`);
    let quote = response.data.quote;
    formValues.value = {
      ...quote,
      quote_image: quote.quote_image,
    };
    isLoading.value = false;
  } catch (error) {
    console.error("Error:", error);
  }
});
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newQuoteImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
const submitForm = (values) => {
  values.movie_id = formValues.value.movie_id;
  if (!(values.quote_image instanceof Blob)) {
    values.quote_image = "";
  }
  values._method = "PUT";
  instance
    .post(`/api/quote/${props.quoteId}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        closeThisModal();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
