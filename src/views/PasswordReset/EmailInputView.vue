<template>
  <TheModal addclass="md:h-1/2">
    <div class="text-2xl text-white">Log in to your account</div>
    <div class="text-gray-500">Welcome back! Please enter your details.</div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        label="Email"
        name="email"
        type="text"
        rules="required|min:3"
        placeholder="Enter your email"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Sign in
      </button>
    </Form>
  </TheModal>
</template>
<script setup>
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import axios from "axios";
import TheModal from "@/components/TheModal.vue";
import { headers } from "@/api/index.js";
import router from "@/router";
axios.defaults.withCredentials = true;
const submitForm = (values) => {
  axios
    .post("http://localhost:8000/api/forgot-password", values, { headers })
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "CheckEmail" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
