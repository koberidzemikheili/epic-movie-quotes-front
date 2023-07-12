<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView class="overflow-x-hidden" />
</template>
<style>
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(
    to bottom,
    rgba(23, 22, 35, 1),
    rgba(21, 23, 37, 1),
    rgba(13, 11, 20, 1)
  );
}
</style>
