<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <div
      class="bg-gray-900 p-6 md:w-1/4 md:h-3/5 w-screen h-screen rounded-md"
      @click.stop
    >
      <div class="w-full">
        <div class="flex flex-col md:m-16 mt-16 justify-center items-center">
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
            <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
              Get started
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import axios from "axios";
import { apiurl, headers } from "@/api/index.js";
const closeModal = () => {
  router.push({ name: "LandingPage" });
};
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
