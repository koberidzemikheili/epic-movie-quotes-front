<template>
  <TheModal addclass="md:h-4/6">
    <div class="text-2xl text-white">
      {{ $t("register.texts.create_an_account") }}
    </div>
    <div class="text-gray-500">
      {{ $t("register.texts.start_journey") }}
    </div>
    <Form @submit="submitForm" class="flex flex-col w-full">
      <InputField
        :label="$t('register.labels.name')"
        name="username"
        type="text"
        rules="required|min:3|max:15|alpha_num"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <InputField
        :label="$t('register.labels.email')"
        name="email"
        type="text"
        rules="required|email"
        placeholder="Enter your email"
      />
      <InputField
        :label="$t('register.labels.password')"
        name="password"
        type="password"
        rules="required|min:8|max:15|alpha_num"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <InputField
        :label="$t('register.labels.password_confirmation')"
        name="password_confirmation"
        type="password"
        rules="confirmed:@password"
        placeholder="Confirm password"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        {{ $t("register.buttons.get_started") }}
      </button>
    </Form>
    <GoogleButton />
    <div class="text-white mt-5">
      {{ $t("register.texts.already_have") }}
      <router-link to="RegisterPage" class="text-blue-700"
        >{{ $t("login.buttons.register") }}
      </router-link>
    </div>
  </TheModal>
</template>
<script setup>
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import GoogleButton from "@/components/GoogleButton.vue";
import TheModal from "@/components/Modals/TheModal.vue";
import router from "@/router";
import instance from "@/api/index.js";
import { setLocale } from "@vee-validate/i18n";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const submitForm = (values) => {
  instance
    .post("api/register", values)
    .then((response) => {
      console.log(response.data);
      if (response.status === 201) {
        router.push({ name: "VerifyAccount" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
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
