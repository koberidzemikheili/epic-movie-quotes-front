<template>
  <TheModal>
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
        <a href="#" class="text-blue-600 float-right">Forgot password</a>
      </div>
      <GoogleButton />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Sign in
      </button>
    </Form>
  </TheModal>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import InputField from "@/components/InputField.vue";
import axios from "axios";
import GoogleButton from "@/components/GoogleButton.vue";
import TheModal from "@/components/TheModal.vue";
import { apiurl, headers } from "@/api/index.js";
const submitForm = (values) => {
  console.log(values);
  axios
    .post(apiurl + "login", values, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
</script>
