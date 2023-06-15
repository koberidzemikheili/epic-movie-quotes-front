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
import TheModal from "@/components/Modals/TheModal.vue";
import router from "@/router";
import instance from "@/api/index.js";

const submitForm = (values) => {
  instance
    .post("http://127.0.0.1:8000/api/forgot-password", values)
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
