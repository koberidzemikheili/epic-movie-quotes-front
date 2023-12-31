<template>
  <Field
    v-slot="{ field }"
    :name="name"
    :rules="hasSelectedTags ? null : rules"
  >
    <div
      class="relative border border-white p-1 rounded flex flex-wrap mt-2 py-1 px-3 border-gray-300 rounded outline-none minheight-9"
    >
      <div class="z-10 flex flex-wrap">
        <div
          v-for="(tag, index) in selectedTags"
          :key="tag.id"
          class="px-1 mx-1 bg-gray-500 text-white text-sm rounded flex items-center"
        >
          {{ tag.genre[locale] }}
          <button
            @click.prevent="removeTag(index)"
            class="ml-2 text-white text-sm"
          >
            X
          </button>
        </div>
      </div>
      <select
        :value="selected"
        @input="addTag($event.target.value)"
        class="absolute w-full h-full opacity-0 z-0"
        v-bind="field"
      >
        <option v-for="tag in genres" :key="tag.id" :value="tag.id">
          {{ tag.genre[locale] }}
        </option>
      </select>
    </div>
    <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </Field>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { fetchGenres } from "@/api/apiService.js";
import { useI18n } from "vue-i18n";

const props = defineProps({
  name: { type: String, required: true },
  error: { type: String, required: false },
  rules: { type: String, required: false },
  modelValue: Array,
});

const emit = defineEmits(["update:modelValue"]);

let selected = ref(null);
let genres = ref([]);
let selectedTags = ref(props.modelValue || []);
const hasSelectedTags = computed(() => selectedTags.value.length > 0);
const { locale } = useI18n();

onMounted(async () => {
  const { data } = await fetchGenres();
  genres.value = data.genres;
});
const updateModelValue = () => {
  emit("update:modelValue", selectedTags.value);
};
const addTag = (id) => {
  const tag = genres.value.find((genre) => genre.id === Number(id));
  if (tag && !selectedTags.value.find((t) => t.id === tag.id)) {
    selectedTags.value.push(tag);
    updateModelValue();
  }
};
const removeTag = (index) => {
  if (index !== -1) {
    selectedTags.value.splice(index, 1);
    updateModelValue();
  }
};
</script>

<style scoped>
.select::-ms-expand {
  display: none;
}
.minheight-9 {
  min-height: 36px;
}
</style>
