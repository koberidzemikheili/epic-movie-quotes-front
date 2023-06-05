<template>
  <TheModal addclass="md:h-1/2">
    <div class="text-2xl text-white">Log in to your account</div>
    <div class="text-gray-500">Welcome back! Please enter your details.</div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        label="Email"
        name="login"
        type="text"
        rules="required|min:3"
        placeholder="Enter your email or username"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        rules="required"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <div class="mt-4">
        <Field name="remember" type="checkbox" :value="true" />
        <label class="text-white ml-2">Remember me</label>
        <router-link
          :to="{ name: 'PasswordResetEmail' }"
          class="text-blue-600 float-right"
          >Forgot password</router-link
        >
      </div>
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Sign in
      </button>
      <GoogleButton />
    </Form>
  </TheModal>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import InputField from "@/components/InputField.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import TheModal from "@/components/TheModal.vue";
import instance from "@/api/index.js";
const submitForm = (values) => {
  instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("/api/login", values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};
</script>
