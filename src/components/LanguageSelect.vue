<template>
  <div class="relative float-right mr-3 text-white">
    <button
      @click="isOpen = !isOpen"
      class="bg-transparent text-white flex items-center"
    >
      {{ getLocaleName(locale) }} <IconDownArrow class="ml-1 mt-1" />
    </button>
    <div v-if="isOpen" class="absolute z-10">
      <button
        v-for="localeOption in getOtherLocales()"
        :key="`locale-${localeOption}`"
        @click="setLocale(localeOption)"
      >
        {{ getLocaleName(localeOption) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import IconDownArrow from "@/components/icons/IconDownArrow.vue";

const { locale, availableLocales } = useI18n();
let isOpen = ref(false);

const setLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("last-locale", newLocale);
  isOpen.value = false;
};

const getLocaleName = (loc) => {
  return loc === "en" ? "Eng" : "ქარ";
};

const getOtherLocales = () => {
  return availableLocales.filter(
    (localeOption) => localeOption !== locale.value
  );
};
</script>
