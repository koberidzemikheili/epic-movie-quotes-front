<template>
  <button
    @click="googleLogin"
    class="text-white bg-transparent border py-2 px-2 rounded inline-flex mt-5"
  >
    <IconGoogle class="relative top-1 mr-1" />
    Sign in with Google
  </button>
</template>
<script setup>
import IconGoogle from "@/components/icons/IconGoogle.vue";
import axios from "axios";
const googleLogin = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/redirect";
};
</script>
