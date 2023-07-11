<template>
  <button
    @click="googleLogin"
    class="text-white bg-transparent border py-2 px-2 rounded inline-flex mt-5 w-full justify-center"
  >
    <IconGoogle class="relative top-1 mr-1" />
    {{ $t("login.buttons.sign_in_google") }}
  </button>
</template>
<script setup>
import IconGoogle from "@/components/icons/IconGoogle.vue";
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const googleLogin = () => {
  window.location.href = backendurl + "/api/auth/redirect";
};
</script>
