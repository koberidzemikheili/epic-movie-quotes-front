<template>
  <Field v-slot="{ field }" :name="name" :rules="rules">
    <div
      class="relative border border-white p-1 rounded flex flex-wrap mt-2 py-1 px-3 border-gray-300 rounded outline-none minheight-9"
    >
      <div class="z-10 flex flex-wrap">
        <div
          v-for="(tag, index) in selectedTags"
          :key="tag.id"
          class="px-1 mx-1 bg-gray-500 text-white text-sm rounded flex items-center"
        >
          {{ tag.genre }}
          <button @click="removeTag(index)" class="ml-2 text-white text-sm">
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
          {{ tag.genre }}
        </option>
      </select>
    </div>
    <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </Field>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { fetchGenres } from "@/api/apiService.js";

defineProps({
  name: { type: String, required: true },
  rules: { type: String, required: false },
  error: { type: String, required: false },
});

const emit = defineEmits(["update:modelValue"]);

let selected = ref(null);
let genres = ref([]);
let selectedTags = ref([]);

watch(
  selectedTags,
  (newTags) => {
    emit(
      "update:modelValue",
      newTags.map((tag) => tag.id)
    );
  },
  { deep: true }
);

onMounted(async () => {
  const { data } = await fetchGenres();
  genres.value = data.genres;
});

const addTag = (id) => {
  const tag = genres.value.find((genre) => genre.id === Number(id));
  if (tag && !selectedTags.value.find((t) => t.id === tag.id)) {
    selectedTags.value.push(tag);
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
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
