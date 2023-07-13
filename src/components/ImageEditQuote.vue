<template>
  <div
    class="w-full h-64 md:h-96 lg:h-96 relative flex items-center justify-center mt-2"
  >
    <img
      :src="displayNewImage ? displayNewImage : currentImage"
      class="rounded-lg w-full h-full object-cover"
    />
    <label
      class="text-white absolute bg-black bg-opacity-50 px-12 py-6 rounded-lg cursor-pointer"
      @dragenter.prevent="dragover = true"
      @dragover.prevent
      @dragleave.prevent="dragover = false"
      @drop.prevent="onDrop"
      :class="{ 'bg-gray-200': dragover }"
    >
      <IconPhotoCamera class="w-full" />
      <div>Change Photo</div>
      <Field
        type="file"
        :name="name"
        class="hidden"
        @change="onFileChange"
        v-model="file"
      />
    </label>
    <ErrorMessage :name="name" class="text-red-600 mt-1" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import IconPhotoCamera from "@/components/icons/IconPhotoCamera.vue";

defineProps({
  name: { type: String, required: true },
  currentImage: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);
const file = ref(null);
const dragover = ref(false);
const displayNewImage = ref();

const onDrop = (e) => {
  dragover.value = false;
  file.value = e.dataTransfer.files[0];
  handleFileSelect(e);
  emit("update:modelValue", file.value);
};

const onFileChange = (e) => {
  file.value = e.target.files[0];
  handleFileSelect(e);
  emit("update:modelValue", file.value);
};
const handleFileSelect = (event) => {
  const file = event.target.files
    ? event.target.files[0]
    : event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      displayNewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
