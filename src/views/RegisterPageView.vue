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
        :placeholder="$t('register.placeholders.username')"
        rules="required|min:3|max:15|alpha_num"
        :error="errorMessage?.errors?.['username']?.[0] || ''"
      />
      <InputField
        :label="$t('register.labels.email')"
        name="email"
        type="text"
        :placeholder="$t('register.placeholders.email')"
        rules="required|email"
        :error="errorMessage?.errors?.['email']?.[0] || ''"
      />
      <InputField
        :label="$t('register.labels.password')"
        name="password"
        type="password"
        :placeholder="$t('register.placeholders.password')"
        rules="required|min:8|max:15|alpha_num"
        :error="errorMessage?.errors?.['password']?.[0] || ''"
      />
      <InputField
        :label="$t('register.labels.password_confirmation')"
        name="password_confirmation"
        type="password"
        :placeholder="$t('register.placeholders.password_confirmation')"
        rules="confirmed:@password"
      />
      <button class="text-white text-l mt-5 bg-red-600 py-2 px-2 rounded">
        {{ $t("register.buttons.get_started") }}
      </button>
    </Form>
    <GoogleButton />
    <div class="text-white mt-5">
      {{ $t("register.texts.already_have") }}
      <router-link :to="{ name: 'LoginPage' }" class="text-blue-700"
        >{{ $t("register.buttons.login") }}
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
import { onMounted, watch, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
let errorMessage = ref("");

const submitForm = (values) => {
  instance
    .post("api/register", values)
    .then((response) => {
      if (response.status === 201) {
        router.push({ name: "VerifyAccount" });
      }
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
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
