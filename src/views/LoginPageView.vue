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
        :placeholder="$t('register.placeholders.username')"
        rules="required|min:3"
        :error="errorMessage?.errors?.['login']?.[0] || errorMessage?.message"
      />
      <div v-if="verificationError" class="text-red-600 mt-1">
        {{ verificationError }}
      </div>
      <InputField
        :label="$t('login.labels.password')"
        name="password"
        type="password"
        :placeholder="$t('register.placeholders.password')"
        rules="required"
        :error="errorMessage?.errors?.['password']?.[0] || ''"
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
        {{ $t("login.buttons.sign_in") }}
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
import { setLocale } from "@vee-validate/i18n";
import { onMounted, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { useUserStore } from "@/stores/user.js";
import { getCSRFToken, login, getUserData } from "@/api/apiService.js";

const userStore = useUserStore();
const { locale } = useI18n();
let errorMessage = ref("");
let verificationError = ref("");

const submitForm = (values) => {
  getCSRFToken().then(() => {
    login(values)
      .then(async () => {
        try {
          const userData = await getUserData();
          if (userData.status === 200) {
            userStore.login();
            router.push({ name: "NewsFeed" });
          }
        } catch (error) {
          console.log(error);
          verificationError.value = error.response.data.message;
        }
      })
      .catch((error) => {
        errorMessage.value = error.response.data;
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
