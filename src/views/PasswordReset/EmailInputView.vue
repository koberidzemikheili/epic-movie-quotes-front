<template>
  <TheModal addclass="md:h-1/2">
    <div class="text-2xl text-white">Forgot Password ?</div>
    <div class="text-gray-500 flex items-center flex-col">
      <div>Enter the email and we’ll send an email with</div>
      instructions to reset your password
    </div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        label="Email"
        name="email"
        type="text"
        rules="required|min:3"
        placeholder="Enter your email"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Send instructions
      </button>
      <router-link
        :to="{ name: 'LoginPage' }"
        class="flex items-center mt-3 mx-auto text-gray-500"
      >
        <IconSmallArrowLeft />
        <span class="ml-2">Back to log in</span>
      </router-link>
    </Form>
  </TheModal>
</template>

<script setup>
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import IconSmallArrowLeft from "@/components/icons/IconSmallArrowLeft.vue";
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
