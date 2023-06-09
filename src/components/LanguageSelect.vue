<template>
  <div class="float-right mr-3 text-white">
    <select v-model="locale" class="text-white bg-transparent">
      <option
        v-for="locale in availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useI18n } from "vue-i18n";
const { locale, availableLocales } = useI18n();
watch(locale, (newLocale) => {
  localStorage.setItem("last-locale", newLocale);
});
</script>
