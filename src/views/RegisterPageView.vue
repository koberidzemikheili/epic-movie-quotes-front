<template>
  <TheModal>
    <div class="text-2xl text-white">Create an account</div>
    <div class="text-gray-500">start your journey !</div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        label="Name"
        name="username"
        type="text"
        rules="required|min:3|max:15|alpha_num"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <InputField
        label="Email"
        name="email"
        type="text"
        rules="required|email"
        placeholder="Enter your email"
      />
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
      <GoogleButton />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Get started
      </button>
    </Form>
  </TheModal>
</template>
<script setup>
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import axios from "axios";
import GoogleButton from "@/components/GoogleButton.vue";
import { apiurl, headers } from "@/api/index.js";
import TheModal from "@/components/TheModal.vue";
const submitForm = (values) => {
  axios
    .post(apiurl + "register", values, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
