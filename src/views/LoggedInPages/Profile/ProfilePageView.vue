<template>
  <TheMainPage>
    <div class="w-full md:w-2/3 p-0 md:p-10">
      <div class="text-2xl md:text-white hidden md:block">
        {{ $t("profilepage.labels.myprofile") }}
      </div>
      <div class="md:hidden mt-4">
        <button @click.prevent="goBack">
          <IconSmallArrowLeft />
        </button>
      </div>
      <div
        class="md:relative bg-navbargray md:bg-cardgray rounded-lg shadow-lg w-full h-full md:h-auto md:rounded-lg mt-1 md:mt-16 pb-64 md:pb-12"
      >
        <div>
          <Form
            @submit="saveEdit"
            class="flex flex-col items-center w-full"
            v-if="userData"
            id="EditPageForm"
          >
            <div class="md:mb-16">
              <img
                class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 md:absolute md:-top-16 md:left-1/2 md:transform md:-translate-x-1/2"
                :src="backendurl + '/storage/' + userData.profile_pictures"
                alt="profile picture"
              />
            </div>
            <label class="text-white cursor-pointer mt-2">
              {{ $t("profilepage.buttons.uploadimage") }}
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
              :error="errorMessage?.errors?.[field.name]?.[0] || ''"
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
          {{ $t("profilepage.buttons.cancel") }}
        </button>
        <button
          type="submit"
          class="bg-red-600 text-white py-1 px-2 rounded mx-1"
          v-if="editing"
          form="EditPageForm"
        >
          {{ $t("profilepage.buttons.savechanges") }}
        </button>
      </div>
      <SuccessModal v-model:isOpen="emailchangedsuccess">{{
        $t("profilepage.labels.checkemail")
      }}</SuccessModal>
    </div>
    <div class="hidden md:block md:w-1/3"></div>
  </TheMainPage>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Form, Field } from "vee-validate";
import { useUserStore } from "@/stores/user.js";
import IconSmallArrowLeft from "@/components/icons/IconSmallArrowLeft.vue";
import TheMainPage from "@/components/TheMainPage.vue";
import ProfileInputField from "@/components/ProfileInputField.vue";
import SuccessModal from "@/components/Modals/SuccessModal.vue";
import { editUser } from "@/api/apiService.js";
import router from "@/router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
let userData = ref();
let editing = ref(false);
let errorMessage = ref("");
let newValues = ref({});
let emailchangedsuccess = ref(false);
let fields = ref([
  {
    label: t("profilepage.labels.username"),
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
    label: t("profilepage.labels.email"),
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
    label: t("profilepage.labels.password"),
    name: "password",
    type: "password",
    value: "••••••••",
    editing: false,
    placeholder: "New password",
    editable: false,
    visible: true,
    rules: "required|min:8|max:15",
  },
]);

const userStore = useUserStore();

const initializeFields = () => {
  userData.value = userStore.userData.user;
  fields.value[0].value = userStore.userData.user.username;
  fields.value[1].value = userStore.userData.user.email;

  if (!userStore.userData.user.google_id) {
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
onMounted(async () => {
  if (!userStore.userData) {
    await userStore.fetchUserData();
  }
  initializeFields();
});

watch(
  () => userStore.userData,
  () => {
    initializeFields();
  }
);

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
  values._method = "PUT";
  editUser(values)
    .then(() => {
      if (values.email) {
        emailchangedsuccess.value = true;
      }
      userStore.fetchUserData();
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
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
