<template>
  <TheMainPage>
    <div class="w-full md:w-2/3 p-0 md:p-10">
      <div class="text-2xl md:text-white hidden md:block">My Profile</div>
      <div class="md:hidden mt-4">
        <button @click.prevent="goBack">
          <IconSmallArrowLeft />
        </button>
      </div>
      <div
        class="md:relative bg-gray-950 rounded-lg shadow-lg w-full h-full md:h-auto md:rounded-lg mt-1 md:mt-16 pb-64 md:pb-12"
      >
        <div>
          <Form
            @submit="saveEdit"
            class="flex flex-col items-center w-full"
            v-if="userData"
            id="EditPageForm"
          >
            <label class="md:mb-16">
              <img
                class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 cursor-pointer md:absolute md:-top-16 md:left-1/2 md:transform md:-translate-x-1/2"
                :src="backendurl + '/storage/' + userData.profile_pictures"
                alt="profile picture"
              />
              <Field
                type="file"
                name="profile_picture"
                class="hidden"
                @change="ProfilePicAction"
              />
            </label>
            <ProfileInputField
              v-for="(field, index) in fields"
              :key="index"
              v-show="field.visible"
              :label="field.label"
              :name="field.name"
              :type="field.type"
              :value="field.value"
              :rules="field.rules"
              :placeholder="field.placeholder"
              :editable="field.editable"
              :editing="field.editing"
              @edit-started="editField"
              @save-field="saveEdit"
            />
          </Form>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          class="text-white py-1 px-2 rounded mx-1"
          @click.prevent="cancelEdit"
          v-if="editing"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-red-600 text-white py-1 px-2 rounded mx-1"
          v-if="editing"
          form="EditPageForm"
        >
          Save Changes
        </button>
      </div>
    </div>
    <div class="hidden md:block md:w-1/3"></div>
  </TheMainPage>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import IconSmallArrowLeft from "@/components/icons/IconSmallArrowLeft.vue";
import TheMainPage from "@/components/TheMainPage.vue";
import ProfileInputField from "@/components/ProfileInputField.vue";
import instance from "@/api/index.js";
import router from "@/router";

const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
let userData = ref();
let editing = ref(false);
let newValues = ref({});
let fields = ref([
  {
    label: "Username",
    name: "username",
    type: "text",
    value: "",
    editing: false,
    placeholder: "New username",
    editable: false,
    visible: true,
    rules: "required|min:3|max:15",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    value: "",
    editing: false,
    placeholder: "New email",
    editable: false,
    visible: true,
    rules: "required|email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    value: "****",
    editing: false,
    placeholder: "New password",
    editable: false,
    visible: true,
    rules: "required|min:8|max:15",
  },
]);

const fetchUserData = async () => {
  let response = await instance.get("api/user");
  userData.value = response.data;
  fields.value[0].value = response.data.username;
  fields.value[1].value = response.data.email;

  if (!response.data.google_id) {
    fields.value.forEach((field) => {
      field.editable = true;
      field.visible = true;
    });
  } else {
    fields.value[0].editable = true;
    fields.value[2].visible = false;
    fields.value[1].editable = false;
  }

  fields.value.forEach((field) => {
    newValues[field.name] = field.value;
  });
};

onMounted(() => {
  fetchUserData();
});

const editField = (fieldName) => {
  editing.value = true;
  fields.value.find((field) => field.name === fieldName).editing = true;
};

const ProfilePicAction = (e) => {
  const image = { profile_picture: e.target.files[0] };
  saveEdit(image);
};
const saveEdit = (values) => {
  fields.value.forEach((field) => {
    field.value = newValues[field.name];
    field.editing = false;
  });
  editing.value = false;
  instance
    .post("/api/edit", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      fetchUserData();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const cancelEdit = () => {
  fields.value.forEach((field) => {
    newValues[field.name] = field.value;
    field.editing = false;
  });
  editing.value = false;
};
const goBack = () => {
  router.go(-1);
};
</script>
