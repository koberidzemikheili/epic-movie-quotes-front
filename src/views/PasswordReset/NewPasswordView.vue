<template>
  <TheModal addclass="md:h-1/2">
    <div class="text-2xl text-white">Create new password</div>
    <div class="text-gray-500">
      Your new password must be different from previous used passwords.
    </div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <Field :value="email" type="hidden" name="email" />
      <Field :value="token" type="hidden" name="token" />
      <InputField
        label="Password"
        name="password"
        type="password"
        rules="required|min:8|max:15|alpha_num"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <InputField
        label="Confirm password"
        name="password_confirmation"
        type="password"
        rules="confirmed:@password"
        placeholder="Confirm password"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Reset Password
      </button>
    </Form>
  </TheModal>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import InputField from "@/components/InputField.vue";
import { ref } from "vue";
import TheModal from "@/components/Modals/TheModal.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import instance from "@/api/index.js";
const route = useRoute();
const email = ref(route.query.email);
const token = ref(route.query.token);

const submitForm = (values) => {
  instance
    .post("http://127.0.0.1:8000/api/reset-password", values)
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "PasswordSuccess" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
