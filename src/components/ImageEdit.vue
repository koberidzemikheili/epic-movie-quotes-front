<template>
  <div class="relative">
    <!-- For larger screens -->
    <label
      v-if="isDesktop"
      class="flex flex-row mt-4 py-2 px-3 border border-gray-300 rounded outline-none bg-transparent h-32 text-white cursor-pointer justify-between"
      @dragenter.prevent="dragover = true"
      @dragover.prevent
      @dragleave.prevent="dragover = false"
      @drop.prevent="onDrop"
      :class="{ 'bg-gray-200': dragover }"
    >
      <div class="w-1/2">
        <img
          :src="currentImage"
          alt="current image"
          class="object-cover h-full w-full"
        />
      </div>
      <div class="w-1/2 flex flex-col justify-center items-center">
        <span class="text-orange-200">REPLACE PHOTO</span>
        <div class="mr-2 mt-1 flex items-center">
          <IconPhotoCamera class="mx-1" /> Drag & drop your image here or
        </div>
        <span class="bg-purple-800 text-white py-1 px-2 mt-1">Choose file</span>
      </div>
      <Field
        type="file"
        :name="name"
        class="hidden"
        @change="onFileChange"
        v-model="file"
      />
    </label>

    <!-- For mobile screens -->
    <!-- ... -->
    <div
      v-else
      class="flex flex-row items-center mt-4 py-2 px-3 border border-gray-300 rounded outline-none bg-transparent h-32 text-white cursor-pointer justify-between"
    >
      <img
        class="w-1/2 object-cover"
        :src="currentImage"
        alt="uploaded file preview"
      />
      <label class="w-1/2 flex flex-col justify-center items-center">
        <span class="text-orange-200">REPLACE PHOTO</span>
        <span class="bg-purple-800 text-white py-1 px-2 mt-2">Choose file</span>
        <Field
          type="file"
          :name="name"
          class="hidden"
          @change="onFileChange"
          v-model="file"
        />
      </label>
    </div>
    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import IconPhotoCamera from "@/components/icons/IconPhotoCamera.vue";

defineProps({
  name: { type: String, required: true },
  currentImage: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);
const file = ref(null);
const dragover = ref(false);

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
