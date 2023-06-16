<template>
  <div class="relative border border-white p-1 rounded flex flex-wrap">
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
      v-model="selected"
      @change="addTag"
      class="absolute w-full h-full opacity-0 z-0"
    >
      <option v-for="tag in genres" :key="tag.id" :value="tag">
        {{ tag.genre }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instance from "@/api/index.js";

const emit = defineEmits(["update:modelValue"]);

let selected = ref(null);
let genres = ref([]);
let selectedTags = ref([]);

onMounted(async () => {
  const { data } = await instance.get("/api/genres");
  genres.value = data.genres;
});

const update = () => {
  emit(
    "update:modelValue",
    selectedTags.value.map((tag) => tag.id)
  );
};

const addTag = () => {
  if (
    selected.value &&
    !selectedTags.value.find((tag) => tag.id === selected.value.id)
  ) {
    selectedTags.value.push(selected.value);
    selected.value = null;
    update();
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
  update();
};
</script>

<style scoped>
.select::-ms-expand {
  display: none;
}
</style>
