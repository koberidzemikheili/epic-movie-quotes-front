<template>
  <ModalForAdd addclass="md:h-auto">
    <div class="text-xl text-white">Add Movie</div>
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
    <Form @submit="submitForm" class="flex flex-col w-full mt-2">
      <InputFieldForAdd
        name="name[en]"
        type="text"
        rules="required|min:3"
        placeholder="Movie Name"
      />
      <InputFieldForAdd
        name="name[ka]"
        type="text"
        rules="required|min:3"
        placeholder="ფილმის სახელი"
      />
      <ChipInputField
        name="tags"
        v-model="tags"
        class="mt-2 py-1 px-3 border-gray-300 rounded outline-none minheight-9"
      />
      <InputFieldForAdd
        name="year"
        type="text"
        rules="required|numeric|min:3"
        placeholder="წელი/Year"
      />
      <InputFieldForAdd
        name="director[en]"
        type="text"
        rules="required|min:3"
        placeholder="Director"
      />
      <InputFieldForAdd
        name="director[ka]"
        type="text"
        rules="required|min:3"
        placeholder="რეჟისორი"
      />
      <InputFieldForAdd
        name="description[en]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="Description"
      />
      <InputFieldForAdd
        name="description[ka]"
        type="textarea"
        as="textarea"
        rules="required|min:3"
        addclass="h-20"
        placeholder="აღწერა"
      />
      <ImageUpload v-model="moviepic" name="profile_picture" rules="required" />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Submit
      </button>
    </Form>
  </ModalForAdd>
</template>
<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import InputFieldForAdd from "@/components/InputFieldForAdd.vue";
import ModalForAdd from "@/components/Modals/ModalForAdd.vue";
import instance from "@/api/index.js";
import ChipInputField from "@/components/ChipInputField.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import { useUserStore } from "@/stores/user.js";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const userStore = useUserStore();
let tags = ref([]);
let moviepic = ref();
const submitForm = (values) => {
  values.genres = tags.value;
  values.movie_image = moviepic.value;
  instance
    .post("/api/add-movie", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
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
