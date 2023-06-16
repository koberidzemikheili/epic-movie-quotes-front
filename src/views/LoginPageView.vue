<template>
  <TheModal addclass="md:h-2/3">
    <div class="text-2xl text-white">
      {{ $t("login.texts.sign_into_account") }}
    </div>
    <div class="text-gray-500">{{ $t("login.texts.welcome_back") }}</div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        :label="$t('login.labels.email')"
        name="login"
        type="text"
        rules="required|min:3"
        placeholder="Enter your email or username"
      />
      <InputField
        :label="$t('login.labels.password')"
        name="password"
        type="password"
        rules="required"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <div class="mt-4">
        <Field name="remember" type="checkbox" :value="true" />
        <label class="text-white ml-2">{{
          $t("login.buttons.remember")
        }}</label>
        <router-link
          :to="{ name: 'PasswordResetEmail' }"
          class="text-blue-600 float-right"
          >{{ $t("login.buttons.forgot_password") }}</router-link
        >
      </div>
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        Sign in
      </button>
    </Form>
    <GoogleButton />
    <div class="text-white mt-5">
      {{ $t("login.texts.dont_have") }}
      <router-link :to="{ name: 'RegisterPage' }" class="text-blue-700"
        >{{ $t("login.buttons.register") }}
      </router-link>
    </div>
  </TheModal>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import InputField from "@/components/InputField.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import TheModal from "@/components/Modals/TheModal.vue";
import instance from "@/api/index.js";
import { setLocale } from "@vee-validate/i18n";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const { locale } = useI18n();
const submitForm = (values) => {
  instance.get("sanctum/csrf-cookie").then(() => {
    instance
      .post("/api/login", values)
      .then((response) => {
        if (response.status === 201);
        userStore.login();
        router.push({ name: "NewsFeed" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};
onMounted(() => {
  if (localStorage.getItem("last-locale")) {
    setLocale(localStorage.getItem("last-locale"));
  } else setLocale("en");
});

watch(locale, (newLocale) => {
  setLocale(newLocale);
});
</script>
