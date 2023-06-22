<template>
  <div>
    <!-- For larger screens -->
    <label
      v-if="isDesktop"
      class="mt-4 py-2 px-3 border border-gray-300 rounded outline-none bg-transparent h-20 text-white cursor-pointer flex items-center justify-between"
      @dragenter.prevent="dragover = true"
      @dragover.prevent
      @dragleave.prevent="dragover = false"
      @drop.prevent="onDrop"
      :class="{ 'bg-gray-200': dragover }"
    >
      <div class="mr-2 flex items-center">
        <IconPhotoCamera class="mx-1" /> Drag & drop your image here or
      </div>
      <span class="bg-purple-800 text-white py-1 px-2">Choose file</span>
      <Field
        type="file"
        :name="name"
        class="hidden"
        rules="required"
        @change="onFileChange"
        v-model="file"
      />
    </label>

    <!-- For mobile screens -->
    <label
      v-else
      class="mt-4 py-2 px-3 border border-gray-300 rounded outline-none bg-transparent h-20 text-white cursor-pointer flex items-center justify-between"
    >
      <span class="mr-2 flex items-center"
        ><IconPhotoCamera class="mx-1" />Upload Image</span
      >
      <span class="bg-purple-800 text-white py-1 px-2">Choose file</span>
      <Field
        type="file"
        :name="name"
        class="hidden"
        :rules="rules"
        @change="onFileChange"
        v-model="file"
      />
    </label>

    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import IconPhotoCamera from "@/components/icons/IconPhotoCamera.vue";
defineProps({
  name: { type: String, required: true },
  rules: { type: String, required: false },
});

let isDesktop = ref(window.innerWidth > 768);
const updateWindowSize = () => {
  isDesktop.value = window.innerWidth > 768;
};
onMounted(() => {
  window.addEventListener("resize", updateWindowSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
});

const emit = defineEmits(["update:modelValue"]);
const file = ref(null);
const dragover = ref(false);

const onDrop = (e) => {
  if (!isDesktop.value) return;
  dragover.value = false;
  file.value = e.dataTransfer.files[0];
  emit("update:modelValue", file.value);
};

const onFileChange = (e) => {
  file.value = e.target.files[0];
  emit("update:modelValue", file.value);
};
</script>
